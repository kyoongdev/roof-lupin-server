import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CategoryRepository } from '@/modules/category/category.repository';
import { CategoryDTO, ContentCategoryDTO, CreateCategoryDTO, CreateContentCategoryDTO, CreateContentCategorySpaceDTO, UpdateCategoryDTO, UpdateContentCategoryDTO, UpdateContentCategorySpaceDTO } from '@/modules/category/dto';
export declare class AdminCategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    findCategory(id: string): Promise<CategoryDTO>;
    findPagingCategories(paging: PagingDTO, args?: Prisma.CategoryFindManyArgs): Promise<PaginationDTO<CategoryDTO>>;
    findPagingContentCategories(paging: PagingDTO, args?: Prisma.ContentCategoryFindManyArgs, userId?: string): Promise<PaginationDTO<ContentCategoryDTO>>;
    createCategory(data: CreateCategoryDTO): Promise<string>;
    createContentCategory(data: CreateContentCategoryDTO): Promise<string>;
    createContentCategorySpace(categoryId: string, data: CreateContentCategorySpaceDTO): Promise<void>;
    updateCategory(id: string, data: UpdateCategoryDTO): Promise<void>;
    updateContentCategory(id: string, data: UpdateContentCategoryDTO): Promise<void>;
    updateContentCategorySpace(categoryId: string, data: UpdateContentCategorySpaceDTO): Promise<void>;
    deleteCategory(id: string): Promise<void>;
    deleteContentCategory(id: string): Promise<void>;
    deleteContentCategorySpace(categoryId: string, spaceId: string): Promise<void>;
}
