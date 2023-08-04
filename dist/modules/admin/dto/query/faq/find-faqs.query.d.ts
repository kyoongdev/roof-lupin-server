import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class AdminFindFAQsQuery extends PagingDTO {
    userName?: string;
    generateQuery(): Prisma.FAQFindManyArgs;
}
