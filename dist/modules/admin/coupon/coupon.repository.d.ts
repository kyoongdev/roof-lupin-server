import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { AdminCouponDTO, UserAdminCouponDTO } from '../dto/coupon';
export declare class AdminCouponRepository {
    private readonly database;
    constructor(database: PrismaService);
    findCoupon(id: string): Promise<AdminCouponDTO>;
    findCouponByCode(code: string): Promise<AdminCouponDTO>;
    countCoupons(args?: Prisma.CouponCountArgs): Promise<number>;
    findCoupons(args?: Prisma.CouponFindManyArgs): Promise<AdminCouponDTO[]>;
    checkUserCoupon(couponId: string, userId: string): Promise<import(".prisma/client").UserCoupon>;
    findUserCoupon(id: string): Promise<UserAdminCouponDTO>;
    findUserCouponByCode(code: string): Promise<UserAdminCouponDTO>;
    countUserCoupons(args?: Prisma.UserCouponCountArgs): Promise<number>;
    findUserCoupons(args?: Prisma.UserCouponFindManyArgs): Promise<UserAdminCouponDTO[]>;
}
