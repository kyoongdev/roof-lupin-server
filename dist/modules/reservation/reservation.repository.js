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
exports.ReservationRepository = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const common_2 = require("../../common");
const query_1 = require("../../common/constants/query");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const reservation_exception_1 = require("./exception/reservation.exception");
let ReservationRepository = class ReservationRepository {
    constructor(database) {
        this.database = database;
    }
    async findFirstReservation(args = {}) {
        const reservation = (await this.database.reservation.findFirst({
            ...args,
            where: {
                ...args.where,
            },
            include: query_1.reservationInclude,
        }));
        return reservation ? new dto_1.ReservationDTO(dto_1.ReservationDTO.generateReservationDTO(reservation)) : null;
    }
    async findReservation(id) {
        const reservation = (await this.database.reservation.findUnique({
            where: {
                id,
            },
            include: query_1.reservationInclude,
        }));
        if (!reservation) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.NOT_FOUND(errorCode_1.RESERVATION_NOT_FOUND));
        }
        return new dto_1.ReservationDetailDTO(dto_1.ReservationDetailDTO.generateReservationDetailDTO(reservation));
    }
    async findReservationByOrderId(orderId) {
        const reservation = (await this.database.reservation.findUnique({
            where: {
                orderId,
            },
            include: query_1.reservationInclude,
        }));
        if (!reservation) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.NOT_FOUND(errorCode_1.RESERVATION_NOT_FOUND));
        }
        return new dto_1.ReservationDetailDTO(dto_1.ReservationDetailDTO.generateReservationDetailDTO(reservation));
    }
    async findReservationByOrderResultId(orderResultId) {
        const reservation = (await this.database.reservation.findUnique({
            where: {
                orderResultId,
            },
            include: query_1.reservationInclude,
        }));
        if (!reservation) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.NOT_FOUND(errorCode_1.RESERVATION_NOT_FOUND));
        }
        return new dto_1.ReservationDetailDTO(dto_1.ReservationDetailDTO.generateReservationDetailDTO(reservation));
    }
    async countReservations(args = {}) {
        return this.database.reservation.count(args);
    }
    async findReservations(args = {}) {
        const reservations = (await this.database.reservation.findMany({
            where: {
                ...args.where,
            },
            include: query_1.reservationInclude,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            ...args,
        }));
        return reservations.map((reservation) => new dto_1.ReservationDTO(dto_1.ReservationDTO.generateReservationDTO(reservation)));
    }
    async createPayment(userId, data, isApproved) {
        const { rentalTypes, spaceId, userCouponIds, ...rest } = data;
        const vatCost = Math.floor(rest.totalCost * (1 / 11));
        const additionalServices = (0, lodash_1.flatMap)(rentalTypes.map((rentalType) => rentalType.additionalServices)).filter(Boolean);
        const reservation = await this.database.reservation.create({
            data: {
                ...rest,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                rentalTypes: {
                    create: rentalTypes.map((rentalType) => ({
                        endAt: rentalType.endAt,
                        startAt: rentalType.startAt,
                        rentalType: {
                            connect: {
                                id: rentalType.rentalTypeId,
                            },
                        },
                    })),
                },
                ...(userCouponIds && {
                    userCoupon: {
                        connect: userCouponIds.map((id) => ({ id })),
                    },
                }),
                ...(additionalServices.length > 0 && {
                    additionalServices: {
                        create: additionalServices.map((service) => ({
                            additionalService: {
                                connect: {
                                    id: service.id,
                                },
                            },
                            count: service.count,
                        })),
                    },
                }),
                vatCost,
                isApproved: typeof isApproved === 'boolean' ? isApproved : true,
                year: Number(rest.year),
                month: Number(rest.month),
                day: Number(rest.day),
                code: `${new Date().getTime()}${(0, common_2.getRandom)(10, 99)}`,
            },
        });
        return reservation.id;
    }
    async createReservationWithTransaction(database, userId, data) {
        const { rentalTypes, spaceId, userCouponIds, ...rest } = data;
        const vatCost = Math.floor(rest.totalCost * (1 / 11));
        const additionalServices = (0, lodash_1.flatMap)(rentalTypes.map((rentalType) => rentalType.additionalServices)).filter(Boolean);
        const reservation = await database.reservation.create({
            data: {
                ...rest,
                year: Number(rest.year),
                month: Number(rest.month),
                day: Number(rest.day),
                code: `${new Date().getTime()}${(0, common_2.getRandom)(10, 99)}`,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                rentalTypes: {
                    create: rentalTypes.map((rentalType) => ({
                        endAt: rentalType.endAt,
                        startAt: rentalType.startAt,
                        rentalType: {
                            connect: {
                                id: rentalType.rentalTypeId,
                            },
                        },
                    })),
                },
                ...(userCouponIds && {
                    userCoupon: {
                        connect: userCouponIds.map((id) => ({ id })),
                    },
                }),
                ...(additionalServices.length > 0 && {
                    additionalServices: {
                        create: additionalServices.map((service) => ({
                            additionalService: {
                                connect: {
                                    id: service.id,
                                },
                            },
                            count: service.count,
                        })),
                    },
                }),
                vatCost,
            },
        });
        return reservation;
    }
    async updateReservation(id, data) {
        await this.database.reservation.update({
            where: {
                id,
            },
            data: {
                ...data,
                year: data.year ? Number(data.year) : undefined,
                month: data.month ? Number(data.month) : undefined,
                day: data.day ? Number(data.day) : undefined,
                approvedAt: data.isApproved ? new Date() : null,
            },
        });
    }
    async updatePayment(id, data) {
        await this.database.reservation.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }
    async updatePaymentWithTransaction(database, id, data) {
        await database.reservation.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }
    async deleteReservation(id) {
        await this.database.reservation.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
};
ReservationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationRepository);
exports.ReservationRepository = ReservationRepository;
//# sourceMappingURL=reservation.repository.js.map