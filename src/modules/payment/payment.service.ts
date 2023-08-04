import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { logger } from '@/log';
import { FinanceProvider, TossPayProvider } from '@/utils';

import { CouponRepository } from '../coupon/coupon.repository';
import { DISCOUNT_TYPE_ENUM } from '../coupon/validation';
import { SettlementRepository } from '../host/settlement/settlement.repository';
import { CreatePaymentDTO, CreateReservationDTO, PayMethod, ReservationDetailDTO } from '../reservation/dto';
import { RESERVATION_COST_BAD_REQUEST, RESERVATION_ERROR_CODE } from '../reservation/exception/errorCode';
import { ReservationException } from '../reservation/exception/reservation.exception';
import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceDetailDTO } from '../space/dto';
import { PossiblePackageDTO, PossibleRentalTypeDTO } from '../space/dto/rental-type';
import { RENTAL_TYPE_ENUM } from '../space/dto/validation/rental-type.validation';
import { RentalTypeRepository } from '../space/rental-type/rental-type.repository';
import { RentalTypeService } from '../space/rental-type/rental-type.service';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { ConfirmTossPaymentDTO, CreatePaymentPayloadDTO, PaymentPayloadDTO, RefundPaymentDTO } from './dto';
import {
  PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT,
  PAYMENT_ALREADY_REFUNDED,
  PAYMENT_CONFLICT,
  PAYMENT_COUPON_DUE_DATE_BEFORE,
  PAYMENT_COUPON_DUE_DATE_EXPIRED,
  PAYMENT_DATE_BAD_REQUEST,
  PAYMENT_DISCOUNT_COST_BAD_REQUEST,
  PAYMENT_ERROR_CODE,
  PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN,
  PAYMENT_IMMEDIATE_PAYMENT_REQUIRED,
  PAYMENT_INTERNAL_SERVER_ERROR,
  PAYMENT_MERCHANT_UID_BAD_REQUEST,
  PAYMENT_MUTATION_FORBIDDEN,
  PAYMENT_NOT_APPROVED,
  PAYMENT_NOT_COMPLETED,
  PAYMENT_ORDER_RESULT_ID_BAD_REQUEST,
  PAYMENT_PAY_METHOD_BAD_REQUEST,
  PAYMENT_REFUND_DUE_DATE_PASSED,
  PAYMENT_REFUND_FORBIDDEN,
  PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR,
  PAYMENT_SPACE_ID_BAD_REQUEST,
  PAYMENT_TOTAL_COST_BAD_REQUEST,
} from './exception/errorCode';
import { PaymentException } from './exception/payment.exception';
//TODO: 환불 로직 추가
@Injectable()
export class PaymentService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly rentalTypeService: RentalTypeService,
    private readonly couponRepository: CouponRepository,
    private readonly tossPay: TossPayProvider,
    private readonly database: PrismaService,
    private readonly fcmEvent: FCMEvent,
    private readonly userRepository: UserRepository,
    private readonly settlementRepository: SettlementRepository,
    private readonly financeProvider: FinanceProvider
  ) {}

  async validateAccount() {
    return await this.financeProvider.getToken();
  }

  async requestPayment(userId: string, data: CreateReservationDTO) {
    const space = await this.spaceRepository.findSpace(data.spaceId);
    await this.validatePayment(data, space);

    if (space.isImmediateReservation) {
      throw new PaymentException(PAYMENT_ERROR_CODE.FORBIDDEN(PAYMENT_IMMEDIATE_PAYMENT_REQUIRED));
    }
    //TODO: Host 알림 추가

    const reservation = await this.reservationRepository.createPayment(userId, data, false);
    return reservation;
  }

  async createPaymentPayload(userId: string, data: CreatePaymentPayloadDTO) {
    const paymentData = new CreatePaymentDTO(data);

    const totalCost = paymentData.originalCost - paymentData.discountCost;

    if (totalCost !== paymentData.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
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
          await Promise.all(
            data.userCouponIds.map(async (couponId) => {
              const coupon = await this.couponRepository.findUserCoupon(couponId);
              await this.couponRepository.deleteUserCoupon(couponId);
            })
          );

        return PaymentPayloadDTO.generatePaymentPayload(space, orderId, rentalTypes, paymentData);
      } catch (err) {
        logger.error(err);
        throw err;
      }
    });

    return result;
  }

  async getReservation(database: TransactionPrisma, userId: string, data: CreatePaymentDTO, space: SpaceDetailDTO) {
    if (data.reservationId) {
      const reservation = await this.reservationRepository.findReservation(data.reservationId);

      data.validateProperties(reservation);

      if (space.isImmediateReservation && !reservation.isApproved) {
        throw new PaymentException(PAYMENT_ERROR_CODE.FORBIDDEN(PAYMENT_NOT_APPROVED));
      }

      return reservation;
    } else {
      if (!space.isImmediateReservation) {
        throw new PaymentException(PAYMENT_ERROR_CODE.FORBIDDEN(PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN));
      }

      return await this.reservationRepository.createReservationWithTransaction(database, userId, data);
    }
  }

  async confirmTossPayment(data: ConfirmTossPaymentDTO) {
    const { paymentKey } = data;
    const reservation = await this.reservationRepository.findReservationByOrderResultId(paymentKey);

    try {
      if (data.orderId !== reservation.orderId || data.amount !== reservation.totalCost) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_ORDER_RESULT_ID_BAD_REQUEST));
      }

      if (reservation.payMethod !== PayMethod.TOSS_PAY) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_PAY_METHOD_BAD_REQUEST));
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
    } catch (err) {
      const coupons = await this.couponRepository.findUserCoupons({
        where: {
          userId: reservation.user.id,
          reservationId: reservation.id,
        },
      });
      await Promise.all(
        coupons.map(async (coupon) => {
          await this.couponRepository.restoreUserCoupon(coupon.id);
        })
      );
      reservation && (await this.reservationRepository.deleteReservation(reservation.id));
      throw err;
    }

    return reservation.id;
  }

  async refundPayment(userId: string, data: RefundPaymentDTO) {
    const reservation = await this.reservationRepository.findReservation(data.reservationId);
    const refundPolicies = await this.spaceRepository.findRefundPolicyBySpaceId(reservation.space.id);

    const reservationDate = new Date(Number(reservation.year), Number(reservation.month) - 1, Number(reservation.day));
    reservationDate.setUTCHours(0, 0, 0, 0);
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);

    const diffDate = reservationDate.getTime() - now.getTime();
    if (diffDate < 0) {
      throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_REFUND_DUE_DATE_PASSED));
    }

    const refundTargetDate = diffDate / (1000 * 60 * 60 * 24);
    const refundPolicy = refundPolicies.reverse().find((policy) => policy.daysBefore <= refundTargetDate);

    const refundCost = reservation.totalCost * (refundPolicy.refundRate / 100);

    const taxCost = Math.floor(refundCost / 1.1);

    if (reservation.user.id !== userId) {
      throw new PaymentException(PAYMENT_ERROR_CODE.FORBIDDEN(PAYMENT_REFUND_FORBIDDEN));
    }

    if (!reservation.payedAt) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_NOT_COMPLETED));
    }

    const cancelableAmount = reservation.totalCost - reservation.refundCost;
    if (cancelableAmount <= 0) {
      throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_ALREADY_REFUNDED));
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

  async deletePayment(orderId: string, userId: string) {
    const reservation = await this.reservationRepository.findReservationByOrderId(orderId);

    if (reservation.user.id !== userId) {
      throw new PaymentException(PAYMENT_ERROR_CODE.FORBIDDEN(PAYMENT_MUTATION_FORBIDDEN));
    }

    const coupons = await this.couponRepository.findUserCoupons({
      where: {
        userId: reservation.user.id,
        reservationId: reservation.id,
      },
    });
    await Promise.all(
      coupons.map(async (coupon) => {
        await this.couponRepository.deleteCoupon(coupon.id);
      })
    );

    await this.reservationRepository.deleteReservation(reservation.id);
  }

  async createSettlement(database: TransactionPrisma, data: ReservationDetailDTO) {
    const isExist = await this.settlementRepository.checkSettlementByDate(
      data.year,
      data.month,
      data.day,
      data.space.hostId
    );
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
    } else {
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

  async sendMessage(reservation: ReservationDetailDTO) {
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
    const code = nanoid(5);
    return `${new Date().getTime()}_${code.toUpperCase()}`;
  }

  async validatePayment(data: CreatePaymentDTO | CreateReservationDTO, space: SpaceDetailDTO) {
    return await Promise.all(
      data.rentalTypes.map(async (item) => {
        const rentalType = await this.rentalTypeRepository.findRentalType(item.rentalTypeId);

        if (rentalType.spaceId !== data.spaceId) {
          throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_SPACE_ID_BAD_REQUEST));
        }

        const possibleRentalType = await this.rentalTypeService.findPossibleRentalTypesById(item.rentalTypeId, {
          year: data.year,
          month: data.month,
          day: data.day,
        });

        const possibleEndAt =
          possibleRentalType.endAt <= possibleRentalType.startAt
            ? possibleRentalType.endAt + 24
            : possibleRentalType.endAt;
        const itemEndAt = item.endAt <= item.startAt ? item.endAt + 24 : item.endAt;

        //INFO: 요청한 시간이 대여 정보의 시작시간과 끝나는 시간에 포함되지 않을 때
        if (item.startAt < possibleRentalType.startAt || possibleEndAt < itemEndAt) {
          throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DATE_BAD_REQUEST));
        }

        if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
          //INFO: 시간 대여 타입에 시간 정보가 없을 때
          if (!possibleRentalType['timeCostInfos']) {
            throw new PaymentException(
              PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR)
            );
          }

          //INFO: 대여하려는 시간이 예약 불가할 때
          (possibleRentalType as PossibleRentalTypeDTO).timeCostInfos.forEach((time) => {
            if (item.startAt <= time.time && time.time <= item.endAt && !time.isPossible) {
              throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_CONFLICT));
            }
          });

          const cost = (possibleRentalType as PossibleRentalTypeDTO).timeCostInfos.reduce<number>((acc, next) => {
            const targetTime = next.time < 9 ? next.time + 24 : next.time;

            if (item.startAt <= targetTime && targetTime <= itemEndAt) {
              acc += next.cost;
            }
            return acc;
          }, 0);

          const { totalCost, originalCost } = await this.getRealCost(cost, data, space);

          //INFO: 가격 정보가 올바르지 않을 때
          if (totalCost !== data.totalCost || originalCost !== data.originalCost) {
            throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
          }
        } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          //INFO: 대여하려는 시간이 잘못 입력됐을 때
          if (item.startAt !== possibleRentalType.startAt || item.endAt !== possibleRentalType.endAt) {
            throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DATE_BAD_REQUEST));
          }
          //INFO: 대여하려는 시간이 예약 불가할 때
          if (!(possibleRentalType as PossiblePackageDTO).isPossible) {
            throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_CONFLICT));
          }
          const { originalCost, totalCost } = await this.getRealCost(rentalType.baseCost, data, space);
          //INFO: 가격 정보가 올바르지 않을 때
          if (originalCost !== data.originalCost || totalCost !== data.totalCost) {
            throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
          }
        } else
          throw new PaymentException(
            PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR)
          );

        return rentalType;
      })
    );
  }

  async getRealCost(cost: number, data: CreatePaymentDTO | CreateReservationDTO, space: SpaceDetailDTO) {
    let discountCost = 0;
    let additionalCost = 0;

    if (data['userCouponIds']) {
      const userCoupons = await this.couponRepository.findUserCoupons({
        where: {
          OR: (data as CreatePaymentDTO).userCouponIds.map((id) => ({ id })),
        },
      });
      await Promise.all(
        (data as CreatePaymentDTO).userCouponIds?.map(async (couponId) => {
          const isExist = userCoupons.find((userCoupon) => userCoupon.id === couponId);
          if (isExist) {
            const usageDateStart = isExist.usageDateStartAt.getTime();
            const usageDateEnd = isExist.usageDateEndAt.getTime();
            const currentDate = new Date();
            currentDate.setUTCHours(0, 0, 0, 0);

            //INFO: 즉시 예약일 때만 쿠폰 검증
            if (!data.reservationId) {
              if (usageDateStart > currentDate.getTime()) {
                throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_COUPON_DUE_DATE_BEFORE));
              }

              if (usageDateEnd < currentDate.getTime()) {
                await this.couponRepository.deleteUserCoupon(isExist.id);

                throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_COUPON_DUE_DATE_EXPIRED));
              }
            }

            if (isExist.coupon.discountType === DISCOUNT_TYPE_ENUM.PERCENTAGE) {
              discountCost += cost * (isExist.coupon.discountValue / 100);
            } else if (isExist.coupon.discountType === DISCOUNT_TYPE_ENUM.VALUE) {
              discountCost += isExist.coupon.discountValue;
            } else throw new InternalServerErrorException('쿠폰이 잘못되었습니다.');
          }
        })
      );
    }

    if (data['discountCost'] && data['discountCost'] !== discountCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DISCOUNT_COST_BAD_REQUEST));
    }

    await Promise.all(
      (data as CreatePaymentDTO).rentalTypes.map(async (rentalType) => {
        if (rentalType.additionalServices && rentalType.additionalServices.length > 0) {
          const additionalServices = await this.rentalTypeRepository.findRentalTypeAdditionalServices(
            rentalType.rentalTypeId
          );

          rentalType.additionalServices.forEach((service) => {
            const baseAdditionalCost = additionalServices.find(
              (additionalService) => additionalService.id === service.id
            );

            if (baseAdditionalCost) {
              if (baseAdditionalCost.maxCount && baseAdditionalCost.maxCount < service.count) {
                throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT));
              }

              additionalCost += baseAdditionalCost.cost * service.count;
            }
          });
        }
      })
    );
    if (space.overflowUserCount < data.userCount) {
      const userCount = data.userCount - space.overflowUserCount;
      additionalCost += space.overflowUserCost * userCount;
    }

    return {
      totalCost: cost - discountCost + additionalCost,
      originalCost: cost + additionalCost,
    };
  }
}
