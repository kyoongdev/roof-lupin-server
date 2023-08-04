import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class AdminFindCouponsQuery extends PagingDTO {
    name: string;
    generateQuery(): Prisma.CouponFindManyArgs;
}
