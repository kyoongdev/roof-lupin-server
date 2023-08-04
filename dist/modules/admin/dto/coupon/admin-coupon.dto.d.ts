import { CategoryDTO, CategoryDTOProps } from '@/modules/category/dto';
export interface AdminCouponDTOProps {
    id: string;
    name: string;
    discountType: number;
    discountValue: number;
    description: string;
    code: string;
    isLupinPay: boolean;
    defaultDueDay: number;
    categories: CategoryDTOProps[];
}
export declare class AdminCouponDTO {
    id: string;
    name: string;
    code: string;
    discountType: number;
    discountValue: number;
    description: string;
    isLupinPay: boolean;
    defaultDueDay: number;
    categories?: CategoryDTO[];
    constructor(props: AdminCouponDTOProps);
}
