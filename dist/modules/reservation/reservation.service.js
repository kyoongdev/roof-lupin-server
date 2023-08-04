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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const errorCode_1 = require("./exception/errorCode");
const reservation_exception_1 = require("./exception/reservation.exception");
const reservation_repository_1 = require("./reservation.repository");
let ReservationService = class ReservationService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async findMyPagingReservations(paging, userId, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reservationRepository.countReservations({
            where: {
                userId,
                ...args.where,
            },
        });
        const reservations = await this.reservationRepository.findReservations({
            where: {
                userId,
                deletedAt: null,
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reservations, { count, paging });
    }
    async findMyReservation(id, userId) {
        const reservation = await this.reservationRepository.findReservation(id);
        if (reservation.user.id !== userId) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.NOT_FOUND(errorCode_1.RESERVATION_USER_FIND_FORBIDDEN));
        }
        return reservation;
    }
    async findMyCloseReservation(userId) {
        return await this.reservationRepository.findFirstReservation({
            where: {
                userId,
            },
            orderBy: [
                {
                    day: 'desc',
                },
            ],
        });
    }
    async deleteMyReservation(id, userId) {
        const reservation = await this.reservationRepository.findReservation(id);
        if (reservation.user.id !== userId) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.NOT_FOUND(errorCode_1.RESERVATION_USER_DELETE_FORBIDDEN));
        }
        await this.reservationRepository.deleteReservation(id);
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservation_repository_1.ReservationRepository])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map