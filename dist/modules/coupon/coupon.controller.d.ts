import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { CouponService } from './coupon.service';
import { RegisterCouponByCodeDTO, UserCouponDTO } from './dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    getMyCoupon(user: RequestUser, id: string): Promise<UserCouponDTO>;
    getMyCoupons(user: RequestUser, paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<UserCouponDTO>>;
    registerCouponByCode(user: RequestUser, body: RegisterCouponByCodeDTO): Promise<import(".prisma/client").UserCoupon & {
        user: import(".prisma/client").User;
    }>;
}
