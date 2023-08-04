import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindContentCategoryQuery extends PagingDTO {
    name?: string;
    generateQuery(): Prisma.ContentCategoryFindManyArgs;
}
