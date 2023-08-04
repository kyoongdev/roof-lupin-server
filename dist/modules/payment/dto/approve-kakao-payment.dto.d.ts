export interface ApproveKakaoPaymentDTOProps {
    orderId: string;
    orderResultId: string;
    pg_token: string;
}
export declare class ApproveKakaoPaymentDTO {
    orderId: string;
    orderResultId: string;
    pg_token: string;
    constructor(props?: ApproveKakaoPaymentDTOProps);
}
