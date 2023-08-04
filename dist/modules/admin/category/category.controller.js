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
exports.AdminCategoryController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../category/dto");
const query_1 = require("../../category/dto/query");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const category_service_1 = require("./category.service");
let AdminCategoryController = class AdminCategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getCategory(id) {
        return await this.categoryService.findCategory(id);
    }
    async getCategories(paging, query) {
        return await this.categoryService.findPagingCategories(paging, query.generateQuery());
    }
    async getContentCategory(paging, query) {
        return await this.categoryService.findPagingContentCategories(paging, query.generateQuery());
    }
    async createCategory(body) {
        return await this.categoryService.createCategory(body);
    }
    async createContentCategory(body) {
        return await this.categoryService.createContentCategory(body);
    }
    async createContentCategorySpace(id, body) {
        return await this.categoryService.createContentCategorySpace(id, body);
    }
    async updateCategory(id, body) {
        await this.categoryService.updateCategory(id, body);
    }
    async updateContentCategory(id, data) {
        await this.categoryService.updateContentCategory(id, data);
    }
    async updateContentCategorySpace(id, data) {
        await this.categoryService.updateContentCategorySpace(id, data);
    }
    async deleteCategory(id) {
        await this.categoryService.deleteCategory(id);
    }
    async deleteContentCategory(id) {
        await this.categoryService.deleteContentCategory(id);
    }
    async deleteContentCategorySpace(id, spaceId) {
        await this.categoryService.deleteContentCategorySpace(id, spaceId);
    }
};
__decorate([
    (0, common_1.Get)(':categoryId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 불러오기',
            summary: '카테고리 자세히 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CategoryDTO,
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 목록 불러오기',
            summary: '카테고리 목록 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({ type: dto_1.CategoryDTO, isPaging: true }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindCategoriesQuery]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/contents'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 목록 불러오기',
            summary: '콘텐츠 카테고리 (가로 스크롤) 목록 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ContentCategoryDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindContentCategoryQuery]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "getContentCategory", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 생성',
            summary: '카테고리 생성',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCategoryDTO]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)('/contents'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 생성',
            summary: '콘텐츠 카테고리 생성',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateContentCategoryDTO]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "createContentCategory", null);
__decorate([
    (0, common_1.Post)('/contents/:contentCategoryId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 공간 추가하기',
            summary: '콘텐츠 카테고리 공간 추가하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 201),
    __param(0, (0, common_1.Param)('contentCategoryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateContentCategorySpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "createContentCategorySpace", null);
__decorate([
    (0, common_1.Patch)(':categoryId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 수정',
            summary: '카테고리 수정',
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
], AdminCategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Patch)('/contents/:contentCategoryId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 수정',
            summary: '콘텐츠 카테고리 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('contentCategoryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateContentCategoryDTO]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "updateContentCategory", null);
__decorate([
    (0, common_1.Patch)('/contents/:contentCategoryId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 공간 수정',
            summary: '콘텐츠 카테고리 공간 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('contentCategoryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateContentCategorySpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "updateContentCategorySpace", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카테고리 삭제',
            summary: '카테고리 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Delete)('/contents/:contentCategoryId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 수정',
            summary: '콘텐츠 카테고리 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('contentCategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "deleteContentCategory", null);
__decorate([
    (0, common_1.Delete)('/contents/:contentCategoryId/spaces/:spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '콘텐츠 카테고리 수정',
            summary: '콘텐츠 카테고리 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('contentCategoryId')),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminCategoryController.prototype, "deleteContentCategorySpace", null);
AdminCategoryController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('/categories', '[관리자] 카테고리 관리'),
    __metadata("design:paramtypes", [category_service_1.AdminCategoryService])
], AdminCategoryController);
exports.AdminCategoryController = AdminCategoryController;
//# sourceMappingURL=category.controller.js.map