import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class AdminFindReportsQuery extends PagingDTO {
    userId?: string;
    userName?: string;
    spaceName?: string;
    isAnswered?: boolean;
    generateQuery(): Prisma.SpaceReportFindManyArgs;
}
