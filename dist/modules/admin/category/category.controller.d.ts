import { PagingDTO } from 'cumuco-nestjs';
import { CategoryDTO, ContentCategoryDTO, CreateCategoryDTO, CreateContentCategoryDTO, CreateContentCategorySpaceDTO, UpdateCategoryDTO, UpdateContentCategoryDTO, UpdateContentCategorySpaceDTO } from '@/modules/category/dto';
import { FindCategoriesQuery, FindContentCategoryQuery } from '@/modules/category/dto/query';
import { AdminCategoryService } from './category.service';
export declare class AdminCategoryController {
    private readonly categoryService;
    constructor(categoryService: AdminCategoryService);
    getCategory(id: string): Promise<CategoryDTO>;
    getCategories(paging: PagingDTO, query: FindCategoriesQuery): Promise<import("cumuco-nestjs").PaginationDTO<CategoryDTO>>;
    getContentCategory(paging: PagingDTO, query: FindContentCategoryQuery): Promise<import("cumuco-nestjs").PaginationDTO<ContentCategoryDTO>>;
    createCategory(body: CreateCategoryDTO): Promise<string>;
    createContentCategory(body: CreateContentCategoryDTO): Promise<string>;
    createContentCategorySpace(id: string, body: CreateContentCategorySpaceDTO): Promise<void>;
    updateCategory(id: string, body: UpdateCategoryDTO): Promise<void>;
    updateContentCategory(id: string, data: UpdateContentCategoryDTO): Promise<void>;
    updateContentCategorySpace(id: string, data: UpdateContentCategorySpaceDTO): Promise<void>;
    deleteCategory(id: string): Promise<void>;
    deleteContentCategory(id: string): Promise<void>;
    deleteContentCategorySpace(id: string, spaceId: string): Promise<void>;
}
