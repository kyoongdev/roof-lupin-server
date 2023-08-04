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
exports.SettlementService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const settlement_repository_1 = require("./settlement.repository");
let SettlementService = class SettlementService {
    constructor(settlementRepository) {
        this.settlementRepository = settlementRepository;
    }
    async findSettlement(id) {
        return this.settlementRepository.findSettlement(id);
    }
    async findMySettlements(hostId, paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.settlementRepository.countSettlements({
            where: args.where,
        });
        const settlements = await this.settlementRepository.findSettlements({
            where: {
                reservations: {
                    some: {
                        rentalTypes: {
                            some: {
                                rentalType: {
                                    space: {
                                        hostId,
                                    },
                                },
                            },
                        },
                    },
                },
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(settlements, { count, paging });
    }
};
SettlementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settlement_repository_1.SettlementRepository])
], SettlementService);
exports.SettlementService = SettlementService;
//# sourceMappingURL=settlement.service.js.map