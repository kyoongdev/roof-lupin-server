import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CategoryRepository } from './category.repository';
import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    findCategory(id: string): Promise<CategoryDTO>;
    findCategories(args?: Prisma.CategoryFindManyArgs): Promise<CategoryDTO[]>;
    findPagingCategories(paging: PagingDTO, args?: Prisma.CategoryFindManyArgs): Promise<PaginationDTO<CategoryDTO>>;
    createCategory(data: CreateCategoryDTO): Promise<string>;
    updateCategory(id: string, data: UpdateCategoryDTO): Promise<void>;
    deleteCategory(id: string): Promise<void>;
}
