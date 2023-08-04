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
exports.ExhibitionController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const dto_1 = require("./dto");
const exhibition_service_1 = require("./exhibition.service");
let ExhibitionController = class ExhibitionController {
    constructor(exhibitionService) {
        this.exhibitionService = exhibitionService;
    }
    async getExhibition(id, user) {
        return this.exhibitionService.findExhibition(id, user?.id);
    }
    async getExhibitions(paging) {
        return this.exhibitionService.findPagingExhibitions(paging);
    }
};
__decorate([
    (0, common_1.Get)(':exhibitionId/detail'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtNullableAuthGuard]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 상세 조회',
            summary: '기획전 상세 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ExhibitionDetailDTO,
    }),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExhibitionController.prototype, "getExhibition", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 목록 조회',
            summary: '기획전 목록 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ExhibitionDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], ExhibitionController.prototype, "getExhibitions", null);
ExhibitionController = __decorate([
    (0, utils_1.ApiController)('exhibitions', '기획전'),
    __metadata("design:paramtypes", [exhibition_service_1.ExhibitionService])
], ExhibitionController);
exports.ExhibitionController = ExhibitionController;
//# sourceMappingURL=exhibition.controller.js.map