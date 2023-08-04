import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CouponDTO, CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO, UserCouponDTO } from './dto';
import { CreateUserCouponDTO } from './dto/create-user-coupon.dto';
export declare class CouponRepository {
    private readonly database;
    constructor(database: PrismaService);
    findCoupon(id: string): Promise<CouponDTO>;
    findCouponByCode(code: string): Promise<CouponDTO>;
    countCoupons(args?: Prisma.CouponCountArgs): Promise<number>;
    findCoupons(args?: Prisma.CouponFindManyArgs): Promise<CouponDTO[]>;
    createCoupon(data: CreateCouponDTO): Promise<string>;
    updateCoupon(id: string, data: UpdateCouponDTO): Promise<string>;
    deleteCoupon(id: string): Promise<string>;
    checkUserCoupon(couponId: string, userId: string): Promise<import(".prisma/client").UserCoupon>;
    findUserCoupon(id: string): Promise<UserCouponDTO>;
    findUserCouponByCode(code: string): Promise<UserCouponDTO>;
    checkUserCouponByCode(code: string): Promise<UserCouponDTO>;
    countUserCoupons(args?: Prisma.UserCouponCountArgs): Promise<number>;
    findUserCoupons(args?: Prisma.UserCouponFindManyArgs): Promise<UserCouponDTO[]>;
    createUserCoupon(couponId: string, data: CreateUserCouponDTO): Promise<import(".prisma/client").UserCoupon & {
        user: import(".prisma/client").User;
    }>;
    updateUserCoupon(id: string, data: UpdateUserCouponDTO): Promise<void>;
    deleteUserCoupon(id: string): Promise<void>;
    hardDeleteUserCoupon(id: string): Promise<void>;
    restoreUserCoupon(id: string): Promise<void>;
    checkCouponCode(): Promise<string>;
}
