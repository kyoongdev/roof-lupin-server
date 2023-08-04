export interface UpdateUserCouponDTOProps {
    count?: number;
    isUsed?: boolean;
    usageDateStartAt: Date;
    usageDateEndAt: Date;
}
export declare class UpdateUserCouponDTO {
    count?: number;
    usageDateStartAt?: Date;
    usageDateEndAt?: Date;
    constructor(props?: UpdateUserCouponDTOProps);
}
