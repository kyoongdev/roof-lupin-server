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
exports.HostSpaceController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../space/dto");
const create_space_dto_1 = require("../../space/dto/create-space.dto");
const rental_type_1 = require("../../space/dto/rental-type");
const update_space_dto_1 = require("../../space/dto/update-space.dto");
const utils_1 = require("../../../utils");
const revalidate_1 = require("../../../utils/aop/revalidate");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const query_1 = require("../dto/query");
const space_service_1 = require("./space.service");
let HostSpaceController = class HostSpaceController {
    constructor(spaceService) {
        this.spaceService = spaceService;
    }
    async getSpace(id, user) {
        return await this.spaceService.findSpace(id, user.id);
    }
    async getSpaceRentalTypes(id, user) {
        return await this.spaceService.findSpaceRentalType(id, user.id);
    }
    async getSpaces(user, query, paging) {
        return await this.spaceService.findPagingSpaces(paging, user.id, query.generateQuery());
    }
    async getPagingSpaces(user) {
        return await this.spaceService.findSpaces(user.id);
    }
    async createSpace(user, body) {
        return await this.spaceService.createSpace(user.id, body);
    }
    async updateSpace(id, user, body) {
        await this.spaceService.updateSpace(id, user.id, body);
    }
    async updateRentalType(spaceId, user, rentalTypeId, body) {
        await this.spaceService.updateRentalType(spaceId, rentalTypeId, user.id, body);
    }
    async deleteSpace(user, id) {
        await this.spaceService.deleteSpace(id, user.id);
    }
    async hardDeleteSpace(user, id) {
        await this.spaceService.hardDeleteSpace(id, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':spaceId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 상세 조회',
            summary: '공간 상세 조회 - 호스트만 사용가능합니다.',
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
], HostSpaceController.prototype, "getSpace", null);
__decorate([
    (0, common_1.Get)(':spaceId/rental-types'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 대여 정보 조회',
            summary: '공간 대여 정보 조회 - 호스트만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: rental_type_1.RentalTypeDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "getSpaceRentalTypes", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 목록 조회',
            summary: '공간 목록 조회 - 호스트만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDTO,
        isPaging: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_1.FindSpacesQuery, cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "getSpaces", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 목록 페이징 조회',
            summary: '공간 목록 페이징 조회 - 호스트만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SpaceDTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "getPagingSpaces", null);
__decorate([
    (0, revalidate_1.RevalidateApi)([
        {
            key: 'spaces',
        },
        {
            key: 'home',
        },
    ]),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 등록',
            summary: '공간 등록 - 호스트만 사용가능합니다.',
        },
        body: {
            type: create_space_dto_1.CreateSpaceDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_space_dto_1.CreateSpaceDTO]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "createSpace", null);
__decorate([
    (0, revalidate_1.RevalidateApi)([
        {
            key: '/spaces/:spaceId/detail',
            index: 0,
        },
        {
            key: 'home',
        },
    ]),
    (0, common_1.Patch)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 수정',
            summary: '공간 수정 - 호스트만 사용가능합니다.',
        },
        body: {
            type: update_space_dto_1.UpdateSpaceDTO,
        },
        params: {
            name: 'spaceId',
            description: '공간 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_space_dto_1.UpdateSpaceDTO]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "updateSpace", null);
__decorate([
    (0, revalidate_1.RevalidateApi)([
        {
            key: '/spaces/:spaceId/detail',
            index: 0,
        },
    ]),
    (0, common_1.Patch)(':spaceId/rental-type/:rentalTypeId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 대여 정보 수정',
            summary: '공간 대여정보 수정 수정 - 호스트만 사용가능합니다.',
        },
        body: {
            type: rental_type_1.UpdateRentalTypeDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Param)('rentalTypeId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, rental_type_1.UpdateRentalTypeDTO]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "updateRentalType", null);
__decorate([
    (0, revalidate_1.RevalidateApi)([
        {
            key: 'spaces',
        },
        {
            key: 'home',
        },
    ]),
    (0, common_1.Delete)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 삭제',
            summary: '공간 삭제 - 호스트만 사용가능합니다.',
        },
        params: {
            name: 'spaceId',
            description: '공간 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "deleteSpace", null);
__decorate([
    (0, revalidate_1.RevalidateApi)([
        {
            key: 'spaces',
        },
        {
            key: 'home',
        },
    ]),
    (0, common_1.Delete)(':spaceId/hard'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 삭제 [하드]',
            summary: '공간 삭제 - 호스트만 사용가능합니다.[하드]',
        },
        params: {
            name: 'spaceId',
            description: '공간 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostSpaceController.prototype, "hardDeleteSpace", null);
HostSpaceController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, utils_1.ApiController)('spaces', '[호스트] 공간 관리'),
    __metadata("design:paramtypes", [space_service_1.HostSpaceService])
], HostSpaceController);
exports.HostSpaceController = HostSpaceController;
//# sourceMappingURL=space.controller.js.map