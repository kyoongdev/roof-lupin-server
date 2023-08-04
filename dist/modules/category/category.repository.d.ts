import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CategoryDTO, CreateCategoryDTO, CreateContentCategoryDTO, CreateContentCategorySpaceDTO, UpdateCategoryDTO, UpdateContentCategoryDTO, UpdateContentCategorySpaceDTO } from './dto';
import { ContentCategoryDTO } from './dto/content-category.dto';
export declare class CategoryRepository {
    private readonly database;
    constructor(database: PrismaService);
    findCategory(id: string): Promise<CategoryDTO>;
    countCategories(args?: Prisma.CategoryCountArgs): Promise<number>;
    findCategories(args?: Prisma.CategoryFindManyArgs): Promise<CategoryDTO[]>;
    findContentCategory(id: string): Promise<ContentCategoryDTO>;
    countContentCategories(args?: Prisma.ContentCategoryCountArgs): Promise<number>;
    findContentCategories(args?: Prisma.ContentCategoryFindManyArgs, userId?: string): Promise<ContentCategoryDTO[]>;
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
