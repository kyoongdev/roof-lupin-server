import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindExhibitionsQuery extends PagingDTO {
    title?: string;
    generateQuery(): Prisma.ExhibitionFindManyArgs;
}
