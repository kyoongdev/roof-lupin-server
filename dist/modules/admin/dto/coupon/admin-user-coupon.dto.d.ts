import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
import { AdminCouponDTO, AdminCouponDTOProps } from './admin-coupon.dto';
export interface UserAdminCouponDTOProps {
    id: string;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
    isUsed: boolean;
    createdAt: Date;
    user: CommonUserProps;
    coupon: AdminCouponDTOProps;
    reservationId?: string;
}
export declare class UserAdminCouponDTO {
    id: string;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
    isUsed: boolean;
    createdAt: Date;
    reservationId?: string;
    user: CommonUserDTO;
    coupon: AdminCouponDTO;
    constructor(props: UserAdminCouponDTOProps);
}
