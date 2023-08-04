import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindSpacesQuery extends PagingDTO {
    title?: string;
    generateQuery(): Prisma.SpaceFindManyArgs;
}
