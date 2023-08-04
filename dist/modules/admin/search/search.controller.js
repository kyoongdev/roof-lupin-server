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
exports.AdminSearchController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../search/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const search_service_1 = require("./search.service");
let AdminSearchController = class AdminSearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async getSearchRecommend(id) {
        return await this.searchService.findSearchRecommend(id);
    }
    async getPagingSearchRecommends(paging) {
        return await this.searchService.findPagingSearchRecommends(paging);
    }
    async createSearchRecommend(body) {
        return await this.searchService.createSearchRecommend(body);
    }
    async updateSearchRecommend(id, body) {
        await this.searchService.updateSearchRecommend(id, body);
    }
    async deleteSearchRecommend(query) {
        await Promise.all(query.ids.split(',').map((id) => this.searchService.deleteSearchRecommend(id)));
    }
};
__decorate([
    (0, common_1.Get)('/recommends/:searchRecommendId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '추천 검색어 자세히 불러오기',
            summary: '추천 검색어 자세히 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SearchRecommendDTO,
    }),
    __param(0, (0, common_1.Param)('searchRecommendId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSearchController.prototype, "getSearchRecommend", null);
__decorate([
    (0, common_1.Get)('/recommends'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '추천 검색어 리스트 불러오기',
            summary: '추천 검색어 리스트 불러오기',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.SearchRecommendDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminSearchController.prototype, "getPagingSearchRecommends", null);
__decorate([
    (0, common_1.Post)('/recommends'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '추천 검색어 생성하기',
            summary: '추천 검색어 생성하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSearchRecommendDTO]),
    __metadata("design:returntype", Promise)
], AdminSearchController.prototype, "createSearchRecommend", null);
__decorate([
    (0, common_1.Patch)('/recommends/:searchRecommendId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '추천 검색어 수정하기',
            summary: '추천 검색어 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('searchRecommendId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSearchRecommendDTO]),
    __metadata("design:returntype", Promise)
], AdminSearchController.prototype, "updateSearchRecommend", null);
__decorate([
    (0, common_1.Delete)('/recommends'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '추천 검색어 삭제하기',
            summary: '추천 검색어 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdsDTO]),
    __metadata("design:returntype", Promise)
], AdminSearchController.prototype, "deleteSearchRecommend", null);
AdminSearchController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('/search', '[관리자] 검색어 관리'),
    __metadata("design:paramtypes", [search_service_1.AdminSearchService])
], AdminSearchController);
exports.AdminSearchController = AdminSearchController;
//# sourceMappingURL=search.controller.js.map