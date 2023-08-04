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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const settlement_1 = require("../dto/settlement");
const query_1 = require("../dto/settlement/query");
const settlement_service_1 = require("./settlement.service");
let SettlementController = class SettlementController {
    constructor(settlementService) {
        this.settlementService = settlementService;
    }
    async findSettlement(id) {
        return await this.settlementService.findSettlement(id);
    }
    async findSettlements(paging, query, host) {
        return await this.settlementService.findMySettlements(host.id, paging, settlement_1.SettlementDTO.generateQuery(query));
    }
};
__decorate([
    (0, common_1.Get)(':settlementId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 상세 조회',
            summary: '정산 상세 조회 - 호스트만 이용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: settlement_1.SettlementDetailDTO,
    }),
    __param(0, (0, common_1.Param)('settlementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettlementController.prototype, "findSettlement", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 상세 조회',
            summary: '정산 상세 조회 - 호스트만 이용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: settlement_1.SettlementDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO,
        query_1.FindSettlementsQuery, Object]),
    __metadata("design:returntype", Promise)
], SettlementController.prototype, "findSettlements", null);
SettlementController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, utils_1.ApiController)('settlements', '[호스트] 정산'),
    __metadata("design:paramtypes", [settlement_service_1.SettlementService])
], SettlementController);
exports.SettlementController = SettlementController;
//# sourceMappingURL=settlement.controller.js.map