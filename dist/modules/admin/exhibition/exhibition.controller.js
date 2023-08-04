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
exports.AdminExhibitionController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../exhibition/dto");
const query_1 = require("../../exhibition/dto/query");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const exhibition_service_1 = require("./exhibition.service");
let AdminExhibitionController = class AdminExhibitionController {
    constructor(exhibitionService) {
        this.exhibitionService = exhibitionService;
    }
    async getExhibition(id) {
        return await this.exhibitionService.findExhibition(id);
    }
    async getPagingExhibitions(paging, query) {
        return await this.exhibitionService.findPagingExhibitions(paging, query.generateQuery());
    }
    async createExhibition(body) {
        return await this.exhibitionService.createExhibition(body);
    }
    async createExhibitionSpace(id, body) {
        await this.exhibitionService.createExhibitionSpace(id, body);
    }
    async updateExhibition(id, body) {
        return await this.exhibitionService.updateExhibition(id, body);
    }
    async updateExhibitionOrder(id, body) {
        return await this.exhibitionService.updateExhibitionOrder(id, body);
    }
    async updateExhibitionSpace(id, body) {
        return await this.exhibitionService.updateExhibitionSpace(id, body);
    }
    async deleteExhibition(id) {
        return await this.exhibitionService.deleteExhibition(id);
    }
    async deleteExhibitionOrder(id) {
        await this.exhibitionService.deleteExhibitionOrder(id);
    }
    async deleteExhibitionSpace(id, spaceId) {
        return await this.exhibitionService.deleteExhibitionSpace(id, spaceId);
    }
};
__decorate([
    (0, common_1.Get)(':exhibitionId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 상세 조회하기',
            summary: '기획전 상세 조회하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ExhibitionDetailDTO,
    }),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "getExhibition", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 조회하기',
            summary: '기획전 조회하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ExhibitionDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindExhibitionsQuery]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "getPagingExhibitions", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 생성하기',
            summary: '기획전 생성하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateExhibitionDTO]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "createExhibition", null);
__decorate([
    (0, common_1.Post)(':exhibitionId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 공간 추가하기',
            summary: '기획전 공간 추가하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 201),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateExhibitionSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "createExhibitionSpace", null);
__decorate([
    (0, common_1.Patch)(':exhibitionId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 수정하기',
            summary: '기획전 수정하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateExhibitionDTO]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "updateExhibition", null);
__decorate([
    (0, common_1.Patch)(':exhibitionId/order'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 순서 수정하기',
            summary: '기획전 순서 수정하기 ',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateExhibitionOrderDTO]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "updateExhibitionOrder", null);
__decorate([
    (0, common_1.Patch)(':exhibitionId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 공간 수정하기',
            summary: '기획전 공간 수정하기 ',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateExhibitionSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "updateExhibitionSpace", null);
__decorate([
    (0, common_1.Delete)(':exhibitionId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 삭제하기',
            summary: '기획전 삭제하기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "deleteExhibition", null);
__decorate([
    (0, common_1.Delete)(':exhibitionId/order'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 순서 삭제하기',
            summary: '기획전 순서 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "deleteExhibitionOrder", null);
__decorate([
    (0, common_1.Delete)(':exhibitionId/spaces/:spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '기획전 공간 삭제하기',
            summary: '기획전 공간 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('exhibitionId')),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminExhibitionController.prototype, "deleteExhibitionSpace", null);
AdminExhibitionController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('exhibitions', '[관리자] 기획전 관리'),
    __metadata("design:paramtypes", [exhibition_service_1.AdminExhibitionService])
], AdminExhibitionController);
exports.AdminExhibitionController = AdminExhibitionController;
//# sourceMappingURL=exhibition.controller.js.map