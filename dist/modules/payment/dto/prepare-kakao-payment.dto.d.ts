export interface PrepareKakaoPaymentDTOProps {
    next_redirect_app_url: string;
    next_redirect_mobile_url: string;
    next_redirect_pc_url: string;
    android_app_scheme: string;
    ios_app_scheme: string;
    orderId: string;
    orderResultId: string;
}
export declare class PrepareKakaoPaymentDTO {
    nextRedirectAppUrl: string;
    nextRedirectMobileUrl: string;
    nextRedirectPcUrl: string;
    androidAppScheme: string;
    iosAppScheme: string;
    orderId: string;
    orderResultId: string;
    constructor(props: PrepareKakaoPaymentDTOProps);
}
