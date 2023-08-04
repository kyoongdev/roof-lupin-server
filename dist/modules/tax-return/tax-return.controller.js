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
exports.TaxReturnController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const tax_return_service_1 = require("./tax-return.service");
let TaxReturnController = class TaxReturnController {
    constructor(taxReturnService) {
        this.taxReturnService = taxReturnService;
    }
    async getTaxReturn(id) {
        return await this.taxReturnService.findTaxReturn(id);
    }
    async getTaxReturns(paging) {
        return await this.taxReturnService.findPagingTaxReturns(paging);
    }
    async createTaxReturn(body) {
        return await this.taxReturnService.createTaxReturn(body);
    }
    async updateTaxReturn(id, body) {
        return await this.taxReturnService.updateTaxReturn(id, body);
    }
    async deleteTaxReturn(id) {
        return await this.taxReturnService.deleteTaxReturn(id);
    }
};
__decorate([
    (0, common_1.Get)(':taxReturnId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금 계산 상세 조회하기',
            summary: '세금 계산 상세 조회하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.TaxReturnDTO,
    }),
    __param(0, (0, common_1.Param)('taxReturnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaxReturnController.prototype, "getTaxReturn", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금 계산 조회하기',
            summary: '세금 계산 조회하기 - 관리자만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.TaxReturnDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], TaxReturnController.prototype, "getTaxReturns", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금 계산 생성하기',
            summary: '세금 계산 생성하기 - 관리자만 사용 가능합니다.',
        },
        body: {
            type: dto_1.CreateTaxReturnDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTaxReturnDTO]),
    __metadata("design:returntype", Promise)
], TaxReturnController.prototype, "createTaxReturn", null);
__decorate([
    (0, common_1.Patch)(':taxReturnId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금 계산 수정하기',
            summary: '세금 계산 수정하기 - 관리자만 사용 가능합니다.',
        },
        body: {
            type: dto_1.UpdateTaxReturnDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('taxReturnId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTaxReturnDTO]),
    __metadata("design:returntype", Promise)
], TaxReturnController.prototype, "updateTaxReturn", null);
__decorate([
    (0, common_1.Delete)(':taxReturnId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금 계산 삭제하기',
            summary: '세금 계산 삭제하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('taxReturnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaxReturnController.prototype, "deleteTaxReturn", null);
TaxReturnController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('admins/tax-returns', '[관리자] 세금 계산'),
    __metadata("design:paramtypes", [tax_return_service_1.TaxReturnService])
], TaxReturnController);
exports.TaxReturnController = TaxReturnController;
//# sourceMappingURL=tax-return.controller.js.map