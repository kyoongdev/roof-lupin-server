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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCategoryService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const category_repository_1 = require("../../category/category.repository");
let AdminCategoryService = class AdminCategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findCategory(id) {
        return await this.categoryRepository.findCategory(id);
    }
    async findPagingCategories(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.categoryRepository.countCategories({
            where: args.where,
        });
        const categories = await this.categoryRepository.findCategories({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(categories, { count, paging });
    }
    async findPagingContentCategories(paging, args = {}, userId) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.categoryRepository.countContentCategories({
            where: args.where,
        });
        const categories = await this.categoryRepository.findContentCategories({
            where: args.where,
            skip,
            take,
        }, userId);
        return new cumuco_nestjs_1.PaginationDTO(categories, { count, paging });
    }
    async createCategory(data) {
        return await this.categoryRepository.createCategory(data);
    }
    async createContentCategory(data) {
        return await this.categoryRepository.createContentCategory(data);
    }
    async createContentCategorySpace(categoryId, data) {
        await this.categoryRepository.findContentCategory(categoryId);
        await this.categoryRepository.createContentCategorySpace(categoryId, data);
    }
    async updateCategory(id, data) {
        await this.findCategory(id);
        return await this.categoryRepository.updateCategory(id, data);
    }
    async updateContentCategory(id, data) {
        await this.categoryRepository.findContentCategory(id);
        return await this.categoryRepository.updateContentCategory(id, data);
    }
    async updateContentCategorySpace(categoryId, data) {
        await this.categoryRepository.findContentCategory(categoryId);
        await this.categoryRepository.updateContentCategorySpace(categoryId, data);
    }
    async deleteCategory(id) {
        await this.findCategory(id);
        await this.categoryRepository.deleteCategory(id);
    }
    async deleteContentCategory(id) {
        await this.categoryRepository.findContentCategory(id);
        await this.categoryRepository.deleteContentCategory(id);
    }
    async deleteContentCategorySpace(categoryId, spaceId) {
        await this.categoryRepository.findContentCategory(categoryId);
        await this.categoryRepository.deleteContentCategorySpace(categoryId, spaceId);
    }
};
AdminCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], AdminCategoryService);
exports.AdminCategoryService = AdminCategoryService;
//# sourceMappingURL=category.service.js.map