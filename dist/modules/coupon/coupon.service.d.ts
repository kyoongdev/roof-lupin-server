import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { RequestUser } from '@/interface/role.interface';
import { CouponRepository } from './coupon.repository';
import { RegisterCouponByCodeDTO, UserCouponDTO } from './dto';
export declare class CouponService {
    private readonly couponRepository;
    private readonly fcmEvent;
    private readonly database;
    constructor(couponRepository: CouponRepository, fcmEvent: FCMEvent, database: PrismaService);
    findUserCoupon(id: string): Promise<UserCouponDTO>;
    findPagingUserCoupons(paging: PagingDTO, userId: string): Promise<PaginationDTO<UserCouponDTO>>;
    registerCouponByCode(user: RequestUser, data: RegisterCouponByCodeDTO): Promise<import(".prisma/client").UserCoupon & {
        user: import(".prisma/client").User;
    }>;
}
