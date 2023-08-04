import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindRankingsQuery extends PagingDTO {
    name?: string;
    generateQuery(): Prisma.RankingFindManyArgs;
}
