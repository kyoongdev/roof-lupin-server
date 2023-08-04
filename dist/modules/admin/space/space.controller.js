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
exports.AdminSpaceController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../space/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const space_1 = require("../dto/query/space");
const space_2 = require("../dto/space");
const space_service_1 = require("./space.service");
let AdminSpaceController = class AdminSpaceController {
    constructor(spaceService) {
        this.spaceService = spaceService;
    }
    async getSpaceIds() {
        return await this.spaceService.findSpaceIds();
    }
    async countSpaces() {
        return await this.spaceService.countSpaces();
    }
    async getSpaces(paging, query) {
        return await this.spaceService.findPagingSpaces(paging, query);
    }
    async getSpace(id) {
        return await this.spaceService.findSpace(id);
    }
    async updateSpace(id, body) {
        await this.spaceService.updateSpace(id, body);
    }
    async updateSpaceOrder(id, body) {
        await this.spaceService.updateSpaceOrder(id, body);
    }
    async deleteSpaceOrder(id) {
        await this.spaceService.deleteSpaceOrder(id);
    }
    async deleteSpace(id) {
        await this.spaceService.deleteSpace(id);
    }
};
__decorate([
    (0, common_1.Get)('ids'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 id, title 불러오기',
            summary: '공간 id, title 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceIdsDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "getSpaceIds", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 개수 불러오기',
            summary: '공간 개수 불러오기 ',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: space_2.SpaceCountDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "countSpaces", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 목록 불러오기',
            summary: '공간 목록 불러오기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, space_1.AdminFindSpacesQuery]),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "getSpaces", null);
__decorate([
    (0, common_1.Get)(':spaceId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 상세 불러오기',
            summary: '공간 상세 불러오기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDetailDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "getSpace", null);
__decorate([
    (0, common_1.Patch)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 수정',
            summary: '공간 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "updateSpace", null);
__decorate([
    (0, common_1.Patch)(':spaceId/order'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 순서 변경 - 광고용',
            summary: '공간 순서 변경 - 광고용',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, space_2.UpdateSpaceOrderDTO]),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "updateSpaceOrder", null);
__decorate([
    (0, common_1.Delete)(':spaceId/order'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 순서 변경 - 광고용',
            summary: '공간 순서 변경 - 광고용',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "deleteSpaceOrder", null);
__decorate([
    (0, common_1.Delete)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 삭제',
            summary: '공간 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSpaceController.prototype, "deleteSpace", null);
AdminSpaceController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('spaces', '[관리자] 공간 관리'),
    __metadata("design:paramtypes", [space_service_1.AdminSpaceService])
], AdminSpaceController);
exports.AdminSpaceController = AdminSpaceController;
//# sourceMappingURL=space.controller.js.map