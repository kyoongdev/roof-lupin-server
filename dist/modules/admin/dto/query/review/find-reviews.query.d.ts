import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class AdminFindReviewsQuery extends PagingDTO {
    userId?: string;
    generateQuery(): Prisma.SpaceReviewFindManyArgs;
}
