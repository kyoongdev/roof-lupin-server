import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindUsersQuery extends PagingDTO {
    nickname?: string;
    email?: string;
    generateQuery(): Prisma.UserFindManyArgs;
}
