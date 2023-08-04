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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const category_service_1 = require("./category.service");
const dto_1 = require("./dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getCategory(id) {
        return await this.categoryService.findCategory(id);
    }
    async getPagingCategories(paging) {
        return await this.categoryService.findPagingCategories(paging);
    }
    async getCategories() {
        return await this.categoryService.findCategories();
    }
    async createCategory(body) {
        return await this.categoryService.createCategory(body);
    }
    async updateCategory(id, body) {
        return await this.categoryService.updateCategory(id, body);
    }
    async deleteCategory(id) {
        return await this.categoryService.deleteCategory(id);
    }
};
__decorate([
    (0, common_1.Get)(':categoryId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 단일 조회',
            summary: '카테고리 단일 조회',
        },
        params: {
            name: 'categoryId',
            required: true,
            type: 'string',
            description: '카테고리 ID',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CategoryDTO,
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)('paging'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 리스트 페이징 조회',
            summary: '카테고리 리스트 페이징 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CategoryDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getPagingCategories", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 리스트  조회',
            summary: '카테고리 리스트  조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CategoryDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 생성',
            summary: '카테고리 생성 - 관리자만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)(':categoryId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 수정',
            summary: '카테고리 수정 - 관리자만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 삭제',
            summary: '카테고리 삭제 - 관리자만 사용가능합니다.',
        },
        params: {
            name: 'categoryId',
            required: true,
            type: 'string',
            description: '카테고리 ID',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    (0, utils_1.ApiController)('categories', '카테고리'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map