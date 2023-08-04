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
exports.HostTaxReturnController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../tax-return/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const tax_return_service_1 = require("./tax-return.service");
let HostTaxReturnController = class HostTaxReturnController {
    constructor(taxReturnService) {
        this.taxReturnService = taxReturnService;
    }
    async findTaxReturn(host, id) {
        return this.taxReturnService.findTaxReturn(id, host.id);
    }
    async findTaxReturns(host, paging) {
        return this.taxReturnService.findPagingTaxReturns(paging, host.id);
    }
};
__decorate([
    (0, common_1.Get)(':taxReturnId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금신고 조회',
            summary: '세금신고 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.TaxReturnDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('taxReturnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostTaxReturnController.prototype, "findTaxReturn", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '세금신고 조회',
            summary: '세금신고 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.TaxReturnDTO,
        isPaging: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], HostTaxReturnController.prototype, "findTaxReturns", null);
HostTaxReturnController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, utils_1.ApiController)('tax-returns', '[호스트] 세금신고'),
    __metadata("design:paramtypes", [tax_return_service_1.HostTaxReturnService])
], HostTaxReturnController);
exports.HostTaxReturnController = HostTaxReturnController;
//# sourceMappingURL=tax-return.controller.js.map