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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const category_repository_1 = require("./category.repository");
const category_exception_1 = require("./exception/category.exception");
const errorCode_1 = require("./exception/errorCode");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findCategory(id) {
        return await this.categoryRepository.findCategory(id);
    }
    async findCategories(args = {}) {
        return await this.categoryRepository.findCategories(args);
    }
    async findPagingCategories(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.categoryRepository.countCategories({
            where: {
                ...args.where,
            },
        });
        const categories = await this.categoryRepository.findCategories({
            skip,
            take,
            ...args,
        });
        return new cumuco_nestjs_1.PaginationDTO(categories, { count, paging });
    }
    async createCategory(data) {
        const homeCategoryCount = await this.categoryRepository.countCategories({
            where: {
                isHome: true,
            },
        });
        if (homeCategoryCount === 5) {
            throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.CONFLICT(errorCode_1.HOME_CATEGORY_COUNT));
        }
        if (data.isHome === true && !data.iconPath) {
            throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.BAD_REQUEST(errorCode_1.HOME_CATEGORY_ICON_PATH_BAD_REQUEST));
        }
        return await this.categoryRepository.createCategory(data);
    }
    async updateCategory(id, data) {
        await this.findCategory(id);
        if (data.isHome === true) {
            if (!data.iconPath) {
                throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.BAD_REQUEST(errorCode_1.HOME_CATEGORY_ICON_PATH_BAD_REQUEST));
            }
            const homeCategoryCount = await this.categoryRepository.countCategories({
                where: {
                    isHome: true,
                },
            });
            if (homeCategoryCount === 5) {
                throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.CONFLICT(errorCode_1.HOME_CATEGORY_COUNT));
            }
        }
        await this.categoryRepository.updateCategory(id, data);
    }
    async deleteCategory(id) {
        await this.findCategory(id);
        await this.categoryRepository.deleteCategory(id);
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map