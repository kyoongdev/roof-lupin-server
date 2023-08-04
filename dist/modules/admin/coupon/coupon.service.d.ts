import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FCMEvent } from '@/event/fcm';
import { CategoryRepository } from '@/modules/category/category.repository';
import { CouponRepository } from '@/modules/coupon/coupon.repository';
import { CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO } from '@/modules/coupon/dto';
import { CreateUserCouponDTO } from '@/modules/coupon/dto/create-user-coupon.dto';
import { AdminCouponDTO, UserAdminCouponDTO } from '../dto/coupon';
import { AdminCouponRepository } from './coupon.repository';
export declare class AdminCouponService {
    private readonly couponRepository;
    private readonly adminCouponRepository;
    private readonly categoryRepository;
    private readonly fcmEvent;
    constructor(couponRepository: CouponRepository, adminCouponRepository: AdminCouponRepository, categoryRepository: CategoryRepository, fcmEvent: FCMEvent);
    findCoupon(id: string): Promise<AdminCouponDTO>;
    findPagingCoupons(paging: PagingDTO, args?: Prisma.CouponFindManyArgs): Promise<PaginationDTO<AdminCouponDTO>>;
    findUserCoupon(id: string): Promise<UserAdminCouponDTO>;
    findPagingUserCoupons(paging: PagingDTO, args?: Prisma.UserCouponFindManyArgs): Promise<PaginationDTO<UserAdminCouponDTO>>;
    createCoupon(data: CreateCouponDTO): Promise<string>;
    createUserCoupon(couponId: string, data: CreateUserCouponDTO): Promise<string>;
    updateCoupon(id: string, data: UpdateCouponDTO): Promise<void>;
    updateUserCoupon(id: string, data: UpdateUserCouponDTO): Promise<void>;
    deleteCoupon(id: string): Promise<void>;
    deleteUserCoupon(id: string): Promise<void>;
}
