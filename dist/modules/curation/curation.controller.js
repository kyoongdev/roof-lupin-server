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
exports.CurationController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const curation_service_1 = require("./curation.service");
const dto_1 = require("./dto");
let CurationController = class CurationController {
    constructor(curationService) {
        this.curationService = curationService;
    }
    async getCurationDetail(id) {
        return await this.curationService.findCuration(id);
    }
    async getPagingCuration(paging) {
        return await this.curationService.findPagingCurations(paging);
    }
    async createCuration(body) {
        return await this.curationService.createCuration(body);
    }
    async updateCuration(id, body) {
        return await this.curationService.updateCuration(id, body);
    }
    async deleteCuration(id) {
        return await this.curationService.deleteCuration(id);
    }
};
__decorate([
    (0, common_1.Get)(':curationId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 상세 조회',
            summary: '큐레이션 상세 조회',
        },
        params: {
            name: 'curationId',
            description: '큐레이션 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CurationDetailDTO,
    }),
    __param(0, (0, common_1.Param)('curationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurationController.prototype, "getCurationDetail", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 목록 조회',
            summary: '큐레이션 목록 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CurationDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], CurationController.prototype, "getPagingCuration", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 등록',
            summary: '큐레이션 등록 - 유저만 사용 가능합니다.',
        },
        body: {
            type: dto_1.CreateCurationDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCurationDTO]),
    __metadata("design:returntype", Promise)
], CurationController.prototype, "createCuration", null);
__decorate([
    (0, common_1.Patch)(':curationId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 수정',
            summary: '큐레이션 수정 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'curationId',
            type: 'string',
            required: true,
            description: '큐레이션 아이디',
        },
        body: {
            type: dto_1.UpdateCurationDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('curationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCurationDTO]),
    __metadata("design:returntype", Promise)
], CurationController.prototype, "updateCuration", null);
__decorate([
    (0, common_1.Delete)(':curationId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 삭제',
            summary: '큐레이션 삭제 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'curationId',
            type: 'string',
            required: true,
            description: '큐레이션 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('curationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurationController.prototype, "deleteCuration", null);
CurationController = __decorate([
    (0, utils_1.ApiController)('curations', '큐레이션'),
    __metadata("design:paramtypes", [curation_service_1.CurationService])
], CurationController);
exports.CurationController = CurationController;
//# sourceMappingURL=curation.controller.js.map