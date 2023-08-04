import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindCategoriesQuery extends PagingDTO {
    isHome?: boolean;
    isRecommend?: boolean;
    name?: string;
    generateQuery(): Prisma.CategoryFindManyArgs;
}
