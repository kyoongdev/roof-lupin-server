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
exports.SpaceController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const interested_dto_1 = require("./dto/interested.dto");
const query_1 = require("./dto/query");
const space_service_1 = require("./space.service");
let SpaceController = class SpaceController {
    constructor(spaceService) {
        this.spaceService = spaceService;
    }
    async getSpace(id, user) {
        return await this.spaceService.findSpace(id, user?.id);
    }
    async getIsSpaceInterested(id, user) {
        return await this.spaceService.findSpaceIsInterested(user?.id, id);
    }
    async getSpaceIds() {
        return await this.spaceService.findSpaceIds();
    }
    async getPagingSpaces(paging, query, user) {
        return await this.spaceService.findPagingSpacesWithSQL(paging, query, user?.id);
    }
    async getPagingInterestSpaces(paging, user) {
        return await this.spaceService.findPagingSpaces(paging, {
            where: {
                userInterests: {
                    some: {
                        userId: user.id,
                    },
                },
            },
        });
    }
    async createSpaceInterest(spaceId, user) {
        await this.spaceService.createInterest(user.id, spaceId);
    }
    async deleteSpaceInterest(spaceId, user) {
        await this.spaceService.deleteInterest(user.id, spaceId);
    }
};
__decorate([
    (0, common_1.Get)(':spaceId/detail'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtNullableAuthGuard]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 상세 조회하기',
            summary: '공간 상세 조회하기',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
            required: true,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDetailDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getSpace", null);
__decorate([
    (0, common_1.Get)(':spaceId/is-interested'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 찜 유무 조회하기',
            summary: '공간 찜 유무 조회하기',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
            required: true,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: interested_dto_1.InterestedDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getIsSpaceInterested", null);
__decorate([
    (0, common_1.Get)('ids'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 아이디 목록 조회하기',
            summary: '공간 아이디 목록 조회하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceIdsDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getSpaceIds", null);
__decorate([
    (0, common_1.Get)('paging'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtNullableAuthGuard]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 목록 조회하기',
            summary: '공간 목록 조회하기 - 검색, 카테고리 등',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindSpacesQuery, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getPagingSpaces", null);
__decorate([
    (0, common_1.Get)('interest'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 찜 목록 조회하기',
            summary: '공간 찜 목록 조회하기 - 유저만 사용가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getPagingInterestSpaces", null);
__decorate([
    (0, common_1.Post)(':spaceId/interest'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 찜 생성하기',
            summary: '공간 찜 생성하기 - 유저만 사용가능합니다.',
        },
        params: {
            type: 'string',
            name: 'spaceId',
            description: '공간 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "createSpaceInterest", null);
__decorate([
    (0, common_1.Delete)(':spaceId/interest'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 찜 삭제하기',
            summary: '공간 찜 삭제하기 - 유저만 사용가능합니다.',
        },
        params: {
            type: 'string',
            name: 'spaceId',
            description: '공간 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "deleteSpaceInterest", null);
SpaceController = __decorate([
    (0, utils_1.ApiController)('spaces', '공간'),
    __metadata("design:paramtypes", [space_service_1.SpaceService])
], SpaceController);
exports.SpaceController = SpaceController;
//# sourceMappingURL=space.controller.js.map