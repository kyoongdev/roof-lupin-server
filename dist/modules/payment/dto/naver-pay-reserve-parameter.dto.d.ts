import { PayReserveParameters } from '@/interface/payment/naver.interface';
import { NaverProductItemDTO } from './naver-product-item.dto';
export type NaverPayReserveParametersDTOProps = PayReserveParameters;
export declare class NaverPayReserveParametersDTO {
    merchantPayKey: string;
    merchantUserKey: string;
    productName: string;
    productCount: number;
    totalPayAmount: number;
    taxScopeAmount: number;
    taxExScopeAmount: number;
    returnUrl: string;
    purchaserName: string;
    purchaserBirthDay: string;
    productItems: NaverProductItemDTO[];
    constructor(props: NaverPayReserveParametersDTOProps);
}
