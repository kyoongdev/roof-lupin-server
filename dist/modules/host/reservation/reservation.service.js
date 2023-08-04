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
exports.HostReservationService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const errorCode_1 = require("../../reservation/exception/errorCode");
const reservation_exception_1 = require("../../reservation/exception/reservation.exception");
const reservation_repository_1 = require("../../reservation/reservation.repository");
let HostReservationService = class HostReservationService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async findReservation(id, hostId) {
        const reservation = await this.reservationRepository.findReservation(id);
        if (reservation.space.hostId !== hostId) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.FORBIDDEN(errorCode_1.RESERVATION_HOST_FIND_FORBIDDEN));
        }
        return reservation;
    }
    async findPagingReservations(paging, hostId, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reservationRepository.countReservations({
            where: args.where,
        });
        const reservations = await this.reservationRepository.findReservations({
            where: {
                rentalTypes: {
                    some: {
                        rentalType: {
                            space: {
                                hostId,
                            },
                        },
                    },
                },
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reservations, { count, paging });
    }
    async approveReservation(id, hostId) {
        const reservation = await this.findReservation(id, hostId);
        if (!reservation.space.isImmediateReservation) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.CONFLICT(errorCode_1.RESERVATION_SPACE_NOT_IMMEDIATE));
        }
        if (reservation.isApproved) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.CONFLICT(errorCode_1.RESERVATION_ALREADY_APPROVED));
        }
        await this.reservationRepository.updateReservation(id, {
            isApproved: true,
        });
    }
    async cancelReservation(id, hostId) {
        const reservation = await this.findReservation(id, hostId);
        if (!reservation.space.isImmediateReservation) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.CONFLICT(errorCode_1.RESERVATION_SPACE_NOT_IMMEDIATE));
        }
        if (reservation.isApproved) {
            throw new reservation_exception_1.ReservationException(errorCode_1.RESERVATION_ERROR_CODE.CONFLICT(errorCode_1.RESERVATION_ALREADY_APPROVED));
        }
        await this.reservationRepository.updateReservation(id, {
            isApproved: false,
            isCanceled: true,
        });
    }
};
HostReservationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservation_repository_1.ReservationRepository])
], HostReservationService);
exports.HostReservationService = HostReservationService;
//# sourceMappingURL=reservation.service.js.map