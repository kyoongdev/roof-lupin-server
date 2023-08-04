import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindBlockedTimesQuery extends PagingDTO {
    spaceId?: string;
    static generateQuery(query: FindBlockedTimesQuery): Prisma.BlockedTimeFindManyArgs;
}
