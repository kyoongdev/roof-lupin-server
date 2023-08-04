export interface CreateUserCouponDTOProps {
    count?: number;
    userId: string;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
}
export declare class CreateUserCouponDTO {
    count?: number;
    userId: string;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
    constructor(props?: CreateUserCouponDTOProps);
}
