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
exports.AdminReservationService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const reservation_repository_1 = require("../../reservation/reservation.repository");
let AdminReservationService = class AdminReservationService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async findReservation(id) {
        return await this.reservationRepository.findReservation(id);
    }
    async findPagingReservations(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reservationRepository.countReservations({
            where: args.where,
        });
        const reservations = await this.reservationRepository.findReservations({
            ...args,
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reservations, { count, paging });
    }
};
AdminReservationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservation_repository_1.ReservationRepository])
], AdminReservationService);
exports.AdminReservationService = AdminReservationService;
//# sourceMappingURL=reservation.service.js.map