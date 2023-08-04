export interface RefundPaymentDTOProps {
    reservationId: string;
    merchant_uid?: string;
}
export declare class RefundPaymentDTO {
    reservationId: string;
    merchant_uid?: string;
    constructor(props?: RefundPaymentDTOProps);
}
