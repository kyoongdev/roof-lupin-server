"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const prisma_service_1 = require("../../database/prisma.service");
const fcm_1 = require("../../event/fcm");
const log_1 = require("../../log");
const utils_1 = require("../../utils");
const coupon_repository_1 = require("../coupon/coupon.repository");
const validation_1 = require("../coupon/validation");
const settlement_repository_1 = require("../host/settlement/settlement.repository");
const dto_1 = require("../reservation/dto");
const errorCode_1 = require("../reservation/exception/errorCode");
const reservation_exception_1 = require("../reservation/exception/reservation.exception");
const reservation_repository_1 = require("../reservation/reservation.repository");
const rental_type_validation_1 = require("../space/dto/validation/rental-type.validation");
const rental_type_repository_1 = require("../space/rental-type/rental-type.repository");
const rental_type_service_1 = require("../space/rental-type/rental-type.service");
const space_repository_1 = require("../space/space.repository");
const user_repository_1 = require("../user/user.repository");
const dto_2 = require("./dto");
const errorCode_2 = require("./exception/errorCode");
const payment_exception_1 = require("./exception/payment.exception");
let PaymentService = class PaymentService {
    constructor(spaceRepository, reservationRepository, rentalTypeRepository, rentalTypeService, couponRepository, tossPay, database, fcmEvent, userRepository, settlementRepository, financeProvider) {
        this.spaceRepository = spaceRepository;
        this.reservationRepository = reservationRepository;
        this.rentalTypeRepository = rentalTypeRepository;
        this.rentalTypeService = rentalTypeService;
        this.couponRepository = couponRepository;
        this.tossPay = tossPay;
        this.database = database;
        this.fcmEvent = fcmEvent;
        this.userRepository = userRepository;
        this.settlementRepository = settlementRepository;
        this.financeProvider = financeProvider;
    }
    async validateAccount() {
        return await this.financeProvider.getToken();
    }
    async requestPayment(userId, data) {
        const space = await this.spaceRepository.findSpace(data.spaceId);
        await this.validatePayment(data, space);
        if (space.isImmediateReservation) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.FORBIDDEN(errorCode_2.PAYMENT_IMMEDIATE_PAYMENT_REQUIRED));
        }
        const reservation = await this.reservationRepository.createPayment(userId, data, false);
        return reservation;
    }
    async createPaymentPayload(userId, data) {
        const paymentData = new dto_1.CreatePaymentDTO(data);
        const totalCost = paymentData.originalCost - paymentData.discountCost;
        if (totalCost !== paymentData.totalCost) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_TOTAL_COST_BAD_REQUEST));
        }
        const result = await this.database.$transaction(async (database) => {
            const space = await this.spaceRepository.findSpace(paymentData.spaceId);
            const reservation = await this.getReservation(database, userId, paymentData, space);
            try {
                const rentalTypes = await this.validatePayment(paymentData, space);
                const orderId = this.createOrderId();
                await this.reservationRepository.updatePaymentWithTransaction(database, reservation.id, {
                    orderId,
                });
                if (data.userCouponIds)
                    await Promise.all(data.userCouponIds.map(async (couponId) => {
                        const coupon = await this.couponRepository.findUserCoupon(couponId);
                        await this.couponRepository.deleteUserCoupon(couponId);
                    }));
                return dto_2.PaymentPayloadDTO.generatePaymentPayload(space, orderId, rentalTypes, paymentData);
            }
            catch (err) {
                log_1.logger.error(err);
                throw err;
            }
        });
        return result;
    }
    async getReservation(database, userId, data, space) {
        if (data.reservationId) {
            const reservation = await this.reservationRepository.findReservation(data.reservationId);
            data.validateProperties(reservation);
            if (space.isImmediateReservation && !reservation.isApproved) {
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.FORBIDDEN(errorCode_2.PAYMENT_NOT_APPROVED));
            }
            return reservation;
        }
        else {
            if (!space.isImmediateReservation) {
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.FORBIDDEN(errorCode_2.PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN));
            }
            return await this.reservationRepository.createReservationWithTransaction(database, userId, data);
        }
    }
    async confirmTossPayment(data) {
        const { paymentKey } = data;
        const reservation = await this.reservationRepository.findReservationByOrderResultId(paymentKey);
        try {
            if (data.orderId !== reservation.orderId || data.amount !== reservation.totalCost) {
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_ORDER_RESULT_ID_BAD_REQUEST));
            }
            if (reservation.payMethod !== dto_1.PayMethod.TOSS_PAY) {
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_PAY_METHOD_BAD_REQUEST));
            }
            await this.database.$transaction(async (database) => {
                const response = await this.tossPay.confirmPayment({
                    amount: reservation.totalCost,
                    orderId: reservation.orderId,
                    paymentKey: reservation.orderResultId,
                });
                response.method;
                await this.reservationRepository.updatePaymentWithTransaction(database, reservation.id, {
                    payedAt: new Date(),
                });
                await this.createSettlement(database, reservation);
            });
            await this.sendMessage(reservation);
        }
        catch (err) {
            const coupons = await this.couponRepository.findUserCoupons({
                where: {
                    userId: reservation.user.id,
                    reservationId: reservation.id,
                },
            });
            await Promise.all(coupons.map(async (coupon) => {
                await this.couponRepository.restoreUserCoupon(coupon.id);
            }));
            reservation && (await this.reservationRepository.deleteReservation(reservation.id));
            throw err;
        }
        return reservation.id;
    }
    async refundPayment(userId, data) {
        const reservation = await this.reservationRepository.findReservation(data.reservationId);
        const refundPolicies = await this.spaceRepository.findRefundPolicyBySpaceId(reservation.space.id);
        const reservationDate = new Date(Number(reservation.year), Number(reservation.month) - 1, Number(reservation.day));
        reservationDate.setUTCHours(0, 0, 0, 0);
        const now = new Date();
        now.setUTCHours(0, 0, 0, 0);
        const diffDate = reservationDate.getTime() - now.getTime();
        if (diffDate < 0) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.CONFLICT(errorCode_2.PAYMENT_REFUND_DUE_DATE_PASSED));
        }
        const refundTargetDate = diffDate / (1000 * 60 * 60 * 24);
        const refundPolicy = refundPolicies.reverse().find((policy) => policy.daysBefore <= refundTargetDate);
        const refundCost = reservation.totalCost * (refundPolicy.refundRate / 100);
        const taxCost = Math.floor(refundCost / 1.1);
        if (reservation.user.id !== userId) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.FORBIDDEN(errorCode_2.PAYMENT_REFUND_FORBIDDEN));
        }
        if (!reservation.payedAt) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_NOT_COMPLETED));
        }
        const cancelableAmount = reservation.totalCost - reservation.refundCost;
        if (cancelableAmount <= 0) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.CONFLICT(errorCode_2.PAYMENT_ALREADY_REFUNDED));
        }
        await this.tossPay.cancelPaymentByPaymentKey(reservation.orderResultId, {
            cancelAmount: refundCost,
            cancelReason: '사용자 환불 요청',
        });
        await this.reservationRepository.updatePayment(reservation.id, {
            refundCost,
        });
        return reservation.id;
    }
    async deletePayment(orderId, userId) {
        const reservation = await this.reservationRepository.findReservationByOrderId(orderId);
        if (reservation.user.id !== userId) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.FORBIDDEN(errorCode_2.PAYMENT_MUTATION_FORBIDDEN));
        }
        const coupons = await this.couponRepository.findUserCoupons({
            where: {
                userId: reservation.user.id,
                reservationId: reservation.id,
            },
        });
        await Promise.all(coupons.map(async (coupon) => {
            await this.couponRepository.deleteCoupon(coupon.id);
        }));
        await this.reservationRepository.deleteReservation(reservation.id);
    }
    async createSettlement(database, data) {
        const isExist = await this.settlementRepository.checkSettlementByDate(data.year, data.month, data.day, data.space.hostId);
        const lupinCost = data.totalCost * 0.1;
        const settlementCost = data.totalCost - lupinCost;
        if (isExist) {
            await this.settlementRepository.updateSettlementWithTransaction(database, isExist.id, {
                discountCost: isExist.discountCost + data.discountCost,
                originalCost: isExist.originalCost + data.originalCost,
                settlementCost: isExist.settlementCost + settlementCost,
                totalCost: isExist.totalCost + data.totalCost,
                vatCost: isExist.vatCost + data.vatCost,
                reservationIds: [...isExist.reservations.map((reservation) => reservation.id), data.id],
            });
        }
        else {
            await this.settlementRepository.createSettlementWithTransaction(database, {
                year: data.year,
                month: data.month,
                day: data.day,
                hostId: data.space.hostId,
                settlementCost,
                totalCost: data.totalCost,
                vatCost: data.vatCost,
                discountCost: data.discountCost,
                originalCost: data.originalCost,
                reservationIds: [data.id],
            });
        }
    }
    async sendMessage(reservation) {
        if (reservation.user.isAlarmAccepted) {
            reservation.rentalTypes.forEach((rentalType) => {
                this.fcmEvent.createReservationUsageAlarm({
                    year: reservation.year,
                    month: reservation.month,
                    day: reservation.day,
                    jobId: reservation.id,
                    nickname: reservation.user.nickname,
                    spaceName: reservation.space.title,
                    time: rentalType.startAt,
                    userId: reservation.user.id,
                });
            });
            this.fcmEvent.createReviewRecommendAlarm({
                year: reservation.year,
                month: reservation.month,
                day: reservation.day + 7,
                jobId: `${reservation.id}_${reservation.user.id}`,
                spaceName: reservation.space.title,
                userId: reservation.user.id,
                nickname: reservation.user.nickname,
            });
        }
    }
    createOrderId() {
        const code = (0, nanoid_1.nanoid)(5);
        return `${new Date().getTime()}_${code.toUpperCase()}`;
    }
    async validatePayment(data, space) {
        return await Promise.all(data.rentalTypes.map(async (item) => {
            const rentalType = await this.rentalTypeRepository.findRentalType(item.rentalTypeId);
            if (rentalType.spaceId !== data.spaceId) {
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_SPACE_ID_BAD_REQUEST));
            }
            const possibleRentalType = await this.rentalTypeService.findPossibleRentalTypesById(item.rentalTypeId, {
                year: data.year,
                month: data.month,
                day: data.day,
            });
            const possibleEndAt = possibleRentalType.endAt <= possibleRentalType.startAt
                ? possibleRentalType.endAt + 24
                : possibleRentalType.endAt;
            const itemEndAt = item.endAt <= item.startAt ? item.endAt + 24 : item.endAt;
            if (item.startAt < possibleRentalType.startAt || possibleEndAt < itemEndAt) {
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_DATE_BAD_REQUEST));
            }
            if (rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.TIME) {
                if (!possibleRentalType['timeCostInfos']) {
                    throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(errorCode_2.PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR));
                }
                possibleRentalType.timeCostInfos.forEach((time) => {
                    if (item.startAt <= time.time && time.time <= item.endAt && !time.isPossible) {
                        throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.CONFLICT(errorCode_2.PAYMENT_CONFLICT));
                    }
                });
                const cost = possibleRentalType.timeCostInfos.reduce((acc, next) => {
                    const targetTime = next.time < 9 ? next.time + 24 : next.time;
                    if (item.startAt <= targetTime && targetTime <= itemEndAt) {
                        acc += next.cost;
                    }
                    return acc;
                }, 0);
                const { totalCost, originalCost } = await this.getRealCost(cost, data, space);
                if (totalCost !== data.totalCost || originalCost !== data.originalCost) {
                    throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.BAD_REQUEST(errorCode_1.RESERVATION_COST_BAD_REQUEST));
                }
            }
            else if (rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.PACKAGE) {
                if (item.startAt !== possibleRentalType.startAt || item.endAt !== possibleRentalType.endAt) {
                    throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_DATE_BAD_REQUEST));
                }
                if (!possibleRentalType.isPossible) {
                    throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.CONFLICT(errorCode_2.PAYMENT_CONFLICT));
                }
                const { originalCost, totalCost } = await this.getRealCost(rentalType.baseCost, data, space);
                if (originalCost !== data.originalCost || totalCost !== data.totalCost) {
                    throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.BAD_REQUEST(errorCode_1.RESERVATION_COST_BAD_REQUEST));
                }
            }
            else
                throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(errorCode_2.PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR));
            return rentalType;
        }));
    }
    async getRealCost(cost, data, space) {
        let discountCost = 0;
        let additionalCost = 0;
        if (data['userCouponIds']) {
            const userCoupons = await this.couponRepository.findUserCoupons({
                where: {
                    OR: data.userCouponIds.map((id) => ({ id })),
                },
            });
            await Promise.all(data.userCouponIds?.map(async (couponId) => {
                const isExist = userCoupons.find((userCoupon) => userCoupon.id === couponId);
                if (isExist) {
                    const usageDateStart = isExist.usageDateStartAt.getTime();
                    const usageDateEnd = isExist.usageDateEndAt.getTime();
                    const currentDate = new Date();
                    currentDate.setUTCHours(0, 0, 0, 0);
                    if (!data.reservationId) {
                        if (usageDateStart > currentDate.getTime()) {
                            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_COUPON_DUE_DATE_BEFORE));
                        }
                        if (usageDateEnd < currentDate.getTime()) {
                            await this.couponRepository.deleteUserCoupon(isExist.id);
                            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_COUPON_DUE_DATE_EXPIRED));
                        }
                    }
                    if (isExist.coupon.discountType === validation_1.DISCOUNT_TYPE_ENUM.PERCENTAGE) {
                        discountCost += cost * (isExist.coupon.discountValue / 100);
                    }
                    else if (isExist.coupon.discountType === validation_1.DISCOUNT_TYPE_ENUM.VALUE) {
                        discountCost += isExist.coupon.discountValue;
                    }
                    else
                        throw new common_1.InternalServerErrorException('쿠폰이 잘못되었습니다.');
                }
            }));
        }
        if (data['discountCost'] && data['discountCost'] !== discountCost) {
            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_DISCOUNT_COST_BAD_REQUEST));
        }
        await Promise.all(data.rentalTypes.map(async (rentalType) => {
            if (rentalType.additionalServices && rentalType.additionalServices.length > 0) {
                const additionalServices = await this.rentalTypeRepository.findRentalTypeAdditionalServices(rentalType.rentalTypeId);
                rentalType.additionalServices.forEach((service) => {
                    const baseAdditionalCost = additionalServices.find((additionalService) => additionalService.id === service.id);
                    if (baseAdditionalCost) {
                        if (baseAdditionalCost.maxCount && baseAdditionalCost.maxCount < service.count) {
                            throw new payment_exception_1.PaymentException(errorCode_2.PAYMENT_ERROR_CODE.BAD_REQUEST(errorCode_2.PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT));
                        }
                        additionalCost += baseAdditionalCost.cost * service.count;
                    }
                });
            }
        }));
        if (space.overflowUserCount < data.userCount) {
            const userCount = data.userCount - space.overflowUserCount;
            additionalCost += space.overflowUserCost * userCount;
        }
        return {
            totalCost: cost - discountCost + additionalCost,
            originalCost: cost + additionalCost,
        };
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [space_repository_1.SpaceRepository,
        reservation_repository_1.ReservationRepository,
        rental_type_repository_1.RentalTypeRepository,
        rental_type_service_1.RentalTypeService,
        coupon_repository_1.CouponRepository,
        utils_1.TossPayProvider,
        prisma_service_1.PrismaService,
        fcm_1.FCMEvent,
        user_repository_1.UserRepository,
        settlement_repository_1.SettlementRepository,
        utils_1.FinanceProvider])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map