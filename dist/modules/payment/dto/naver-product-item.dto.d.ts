import { ProductItem } from '@/interface/payment/naver.interface';
export type NaverProductItemDTOProps = ProductItem;
export declare class NaverProductItemDTO {
    categoryType: string;
    categoryId: string;
    name: string;
    uid: string;
    payReferrer?: string;
    startDate?: string;
    endDate?: string;
    sellerId?: string;
    count: number;
    constructor(props: NaverProductItemDTOProps);
}
