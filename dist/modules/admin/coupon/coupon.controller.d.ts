import { PagingDTO } from 'cumuco-nestjs';
import { CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO } from '@/modules/coupon/dto';
import { CreateUserCouponDTO } from '@/modules/coupon/dto/create-user-coupon.dto';
import { AdminCouponDTO, UserAdminCouponDTO } from '../dto/coupon';
import { AdminFindCouponsQuery, AdminFindUserCouponsQuery } from '../dto/query';
import { AdminCouponService } from './coupon.service';
export declare class AdminCouponController {
    private readonly couponService;
    constructor(couponService: AdminCouponService);
    getCoupon(id: string): Promise<AdminCouponDTO>;
    getCoupons(paging: PagingDTO, query: AdminFindCouponsQuery): Promise<import("cumuco-nestjs").PaginationDTO<AdminCouponDTO>>;
    getUserCoupon(id: string): Promise<UserAdminCouponDTO>;
    getUserCoupons(paging: PagingDTO, query: AdminFindUserCouponsQuery): Promise<import("cumuco-nestjs").PaginationDTO<UserAdminCouponDTO>>;
    createCoupon(body: CreateCouponDTO): Promise<string>;
    createUserCoupon(id: string, body: CreateUserCouponDTO): Promise<string>;
    updateCoupon(id: string, body: UpdateCouponDTO): Promise<void>;
    updateUserCoupon(id: string, body: UpdateUserCouponDTO): Promise<void>;
    deleteCoupon(id: string): Promise<void>;
    deleteUserCoupon(id: string): Promise<void>;
}
