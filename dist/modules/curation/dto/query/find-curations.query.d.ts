import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindCurationsQuery extends PagingDTO {
    title?: string;
    subTitle?: string;
    isMain?: boolean;
    generateQuery(): Prisma.CurationFindManyArgs;
}
