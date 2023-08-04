export interface UpdateCouponDTOProps {
    name?: string;
    discountType?: number;
    discountValue?: number;
    code?: string;
    description?: string;
    isLupinPay?: boolean;
    defaultDueDateStart?: Date;
    defaultDueDay?: number;
    categoryIds?: string[];
    link?: string;
}
export declare class UpdateCouponDTO {
    name?: string;
    code?: string;
    discountType?: number;
    discountValue?: number;
    description?: string;
    isLupinPay?: boolean;
    defaultDueDateStart?: Date;
    defaultDueDay?: number;
    categoryIds?: string[];
    link?: string;
    constructor(props?: UpdateCouponDTOProps);
}
