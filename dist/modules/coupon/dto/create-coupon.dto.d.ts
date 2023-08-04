export interface CreateCouponDTOProps {
    name: string;
    discountType: number;
    discountValue: number;
    code?: string;
    description: string;
    isLupinPay: boolean;
    categoryIds?: string[];
    defaultDueDateStart?: Date;
    defaultDueDay: number;
    link?: string;
}
export declare class CreateCouponDTO {
    name: string;
    code?: string;
    discountType: number;
    discountValue: number;
    description: string;
    isLupinPay: boolean;
    defaultDueDay: number;
    defaultDueDateStart?: Date;
    categoryIds?: string[];
    link?: string;
    constructor(props?: CreateCouponDTOProps);
}
