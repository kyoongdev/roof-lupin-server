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
exports.AdminSettlementService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const settlement_repository_1 = require("../../host/settlement/settlement.repository");
const reservation_repository_1 = require("../../reservation/reservation.repository");
const admin_exception_1 = require("../exception/admin.exception");
const errorCode_1 = require("../exception/errorCode");
let AdminSettlementService = class AdminSettlementService {
    constructor(settlementRepository, reservationRepository) {
        this.settlementRepository = settlementRepository;
        this.reservationRepository = reservationRepository;
    }
    async findSettlement(id) {
        return await this.settlementRepository.findSettlement(id);
    }
    async findPagingSettlements(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.settlementRepository.countSettlements({
            where: args.where,
        });
        const settlements = await this.settlementRepository.findSettlements({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(settlements, { count, paging });
    }
    async createSettlement(data) {
        const isExist = await this.settlementRepository.checkSettlementByHostAndDate(data.year, data.month, data.day, data.hostId);
        if (isExist) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.CONFLICT(errorCode_1.ADMIN_SETTLEMENT_ALREADY_EXISTS));
        }
        if (data.reservationIds) {
            await Promise.all(data.reservationIds.map(async (id) => {
                await this.reservationRepository.findReservation(id);
            }));
        }
        return await this.settlementRepository.createSettlement(data);
    }
    async updateSettlement(id, data) {
        await this.findSettlement(id);
        if (data.reservationIds) {
            await Promise.all(data.reservationIds.map(async (id) => {
                await this.reservationRepository.findReservation(id);
            }));
        }
        await this.settlementRepository.updateSettlement(id, data);
    }
    async deleteSettlement(id) {
        await this.findSettlement(id);
        await this.settlementRepository.deleteSettlement(id);
    }
};
AdminSettlementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settlement_repository_1.SettlementRepository,
        reservation_repository_1.ReservationRepository])
], AdminSettlementService);
exports.AdminSettlementService = AdminSettlementService;
//# sourceMappingURL=settlement.service.js.map