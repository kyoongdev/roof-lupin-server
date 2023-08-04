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
exports.HomeController = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const category_service_1 = require("../category/category.service");
const dto_1 = require("../category/dto");
const curation_service_1 = require("../curation/curation.service");
const dto_2 = require("../curation/dto");
const dto_3 = require("./dto");
const home_service_1 = require("./home.service");
let HomeController = class HomeController {
    constructor(homeService, curationService, categoryService) {
        this.homeService = homeService;
        this.curationService = curationService;
        this.categoryService = categoryService;
    }
    async getHomeContents(user) {
        return await this.homeService.getHomeContents(user?.id);
    }
    async getHomeCuration() {
        return await this.curationService.findCurations({
            where: { isMain: true },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getHomeCategories() {
        return await this.categoryService.findCategories({
            where: {
                isHome: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
};
__decorate([
    (0, common_1.Get)('contents'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtNullableAuthGuard]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 화면 컨텐츠를 가져옵니다.',
            summary: '홈 화면 컨텐츠를 가져옵니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_3.HomeContentsDTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeContents", null);
__decorate([
    (0, common_1.Get)('curations'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 화면 큐레이션 목록 조회',
            summary: '홈 화면 큐레이션 목록 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.CurationDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeCuration", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 카테고리 리스트 조회',
            summary: '홈 카테고리 리스트 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CategoryDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeCategories", null);
HomeController = __decorate([
    (0, utils_1.ApiController)('home', '홈 화면 컨텐츠'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __metadata("design:paramtypes", [home_service_1.HomeService,
        curation_service_1.CurationService,
        category_service_1.CategoryService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map