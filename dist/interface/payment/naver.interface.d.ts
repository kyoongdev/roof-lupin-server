import { BANK_CODE, CARD_CODE } from '@/common/constants';
export type AdmissionTypeCode = '01' | '03' | '04';
export interface ProductItem {
    categoryType: 'PRODUCT';
    categoryId: 'GENERAL';
    uid: string;
    name: string;
    payReferrer?: string;
    startDate?: string;
    endDate?: string;
    sellerId?: string;
    count: number;
}
export interface PayReserveParameters {
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
    productItems: ProductItem[];
}
export interface ReturnUrlQuery {
    resultCode: string;
    paymentId: string;
}
export interface NaverApprovePaymentDetail {
    paymentId: string;
    payHistId: string;
    merchantId: string;
    merchantName: string;
    merchantPayKey: string;
    merchantUserKey: string;
    admissionTypeCode: AdmissionTypeCode;
    admissionYmdt: string;
    tradeConfirmYmdt: string;
    admissionState: 'SUCCESS' | 'FAIL';
    totalPayAmount: number;
    primaryPayAmount: number;
    npointPayAmount: number;
    giftCardAmount: number;
    taxScopeAmount: number;
    taxExScopeAmount: number;
    environmentDepositAmount: number;
    primaryPayMeans: 'CARD' | 'BANK';
    cardCorpCode: keyof typeof CARD_CODE;
    cardNo: string;
    cardAuthNo: string;
    cardInstCount: number;
    usedCardPoint: boolean;
    bankCorpCode: keyof typeof BANK_CODE;
    bankAccountNo: string;
    productName: string;
    settleExpected: boolean;
    settleExpectAmount: number;
    payCommissionAmount: number;
    extraDeduction: boolean;
    useCfmYmdt: string;
    merchantExtraParameter: string;
    userIdentifier?: string;
}
export interface NaverApprovedPayment {
    paymentId: string;
    detail: NaverApprovePaymentDetail;
}
export interface NaverCancelPayment {
    paymentId: string;
    cancelAmount: number;
    cancelReason: string;
    cancelRequester: '1' | '2';
    taxScopeAmount: number;
    taxExScopeAmount: number;
    environmentDepositAmount: number;
    doCompareRest: Number;
    expectedRestAmount: number;
}
