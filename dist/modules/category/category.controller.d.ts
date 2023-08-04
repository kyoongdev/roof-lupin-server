import { PagingDTO } from 'cumuco-nestjs';
import { CategoryService } from './category.service';
import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategory(id: string): Promise<CategoryDTO>;
    getPagingCategories(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<CategoryDTO>>;
    getCategories(): Promise<CategoryDTO[]>;
    createCategory(body: CreateCategoryDTO): Promise<string>;
    updateCategory(id: string, body: UpdateCategoryDTO): Promise<void>;
    deleteCategory(id: string): Promise<void>;
}
