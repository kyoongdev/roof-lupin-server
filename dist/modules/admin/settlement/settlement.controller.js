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
exports.AdminSettlementController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const settlement_1 = require("../../host/dto/settlement");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const query_1 = require("../dto/query");
const settlement_service_1 = require("./settlement.service");
let AdminSettlementController = class AdminSettlementController {
    constructor(settlementService) {
        this.settlementService = settlementService;
    }
    async getSettlementDetail(id) {
        return await this.settlementService.findSettlement(id);
    }
    async getSettlements(paging, query) {
        return await this.settlementService.findPagingSettlements(paging, query_1.AdminFindSettlementsQuery.generateQuery(query));
    }
    async createSettlement(data) {
        return await this.settlementService.createSettlement(data);
    }
    async updateSettlement(id, data) {
        await this.settlementService.updateSettlement(id, data);
    }
    async deleteSettlement(id) {
        await this.settlementService.deleteSettlement(id);
    }
};
__decorate([
    (0, common_1.Get)(':settlementId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 상세 조회하기',
            summary: '정산 상세 조회하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: settlement_1.SettlementDTO,
    }),
    __param(0, (0, common_1.Param)('settlementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSettlementController.prototype, "getSettlementDetail", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 조회하기',
            summary: '정산 조회하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: settlement_1.SettlementDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.AdminFindSettlementsQuery]),
    __metadata("design:returntype", Promise)
], AdminSettlementController.prototype, "getSettlements", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 생성하기',
            summary: '정산 생성하기 - 관리자만 사용 가능합니다.',
        },
        body: {
            type: settlement_1.CreateSettlementDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settlement_1.CreateSettlementDTO]),
    __metadata("design:returntype", Promise)
], AdminSettlementController.prototype, "createSettlement", null);
__decorate([
    (0, common_1.Patch)(':settlementId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 수정하기',
            summary: '정산 수정하기 - 관리자만 사용 가능합니다.',
        },
        body: {
            type: settlement_1.UpdateSettlementDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('settlementId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, settlement_1.UpdateSettlementDTO]),
    __metadata("design:returntype", Promise)
], AdminSettlementController.prototype, "updateSettlement", null);
__decorate([
    (0, common_1.Delete)(':settlementId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '정산 삭제',
            summary: '정산 삭제 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('settlementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSettlementController.prototype, "deleteSettlement", null);
AdminSettlementController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('settlements', '[관리자] 정산'),
    __metadata("design:paramtypes", [settlement_service_1.AdminSettlementService])
], AdminSettlementController);
exports.AdminSettlementController = AdminSettlementController;
//# sourceMappingURL=settlement.controller.js.map