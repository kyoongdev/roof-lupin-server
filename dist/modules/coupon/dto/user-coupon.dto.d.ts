import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
import { CouponDTO, CouponDTOProps } from './coupon.dto';
export interface UserCouponDTOProps {
    id: string;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
    isUsed: boolean;
    createdAt: Date;
    user: CommonUserProps;
    coupon: CouponDTOProps;
    reservationId?: string;
}
export declare class UserCouponDTO {
    id: string;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
    createdAt: Date;
    reservationId?: string;
    user: CommonUserDTO;
    coupon: CouponDTO;
    constructor(props: UserCouponDTOProps);
}
