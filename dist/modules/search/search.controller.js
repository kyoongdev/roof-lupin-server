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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async getSearchRecords(user) {
        return await this.searchService.findSearchRecords({
            where: {
                userId: user.id,
            },
        });
    }
    async getSearchRecommends() {
        return await this.searchService.findSearchRecommends({});
    }
    async deleteSearchRecord(user, id) {
        return await this.searchService.deleteSearchRecord(id, user.id);
    }
    async deleteAllSearchRecord(user) {
        return await this.searchService.deleteAllSearchRecords(user.id);
    }
    async getRecentSearchSpaces(user) {
        return await this.searchService.findMyRecentSpace(user.id);
    }
};
__decorate([
    (0, common_1.Get)('records'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '최근 검색어 조회',
            summary: '최근 검색어 조회 - 유저만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.SearchRecordDTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getSearchRecords", null);
__decorate([
    (0, common_1.Get)('recommends'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '인기 검색어 조회',
            summary: '인기 검색어 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.SearchRecommendDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getSearchRecommends", null);
__decorate([
    (0, common_1.Delete)('records/:searchRecordId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '검색어 삭제',
            summary: '검색어 삭제 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'searchRecordId',
            description: '검색어 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('searchRecordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "deleteSearchRecord", null);
__decorate([
    (0, common_1.Delete)('records'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '검색어 전체 삭제',
            summary: '검색어 전체 삭제 - 유저만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "deleteAllSearchRecord", null);
__decorate([
    (0, common_1.Get)('recent/spaces'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '최근 검색한 공간 조회',
            summary: '최근 검색한 공간 조회 - 유저만 사용 가능합니다.',
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
], SearchController.prototype, "getRecentSearchSpaces", null);
SearchController = __decorate([
    (0, utils_1.ApiController)('search', '검색어'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map