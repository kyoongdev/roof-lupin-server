import { CategoryDTO, CategoryDTOProps } from '@/modules/category/dto';
export interface CouponDTOProps {
    id: string;
    name: string;
    discountType: number;
    discountValue: number;
    description: string;
    isLupinPay: boolean;
    defaultDueDateStart?: Date;
    defaultDueDay: number;
    categories: CategoryDTOProps[];
}
export declare class CouponDTO {
    id: string;
    name: string;
    discountType: number;
    discountValue: number;
    description: string;
    isLupinPay: boolean;
    defaultDueDateStart?: Date;
    defaultDueDay: number;
    categories?: CategoryDTO[];
    constructor(props: CouponDTOProps);
}
