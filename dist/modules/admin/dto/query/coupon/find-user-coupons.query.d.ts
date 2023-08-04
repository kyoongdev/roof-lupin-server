import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class AdminFindUserCouponsQuery extends PagingDTO {
    userId?: string;
    username?: string;
    generateQuery(): Prisma.UserCouponFindManyArgs;
}
