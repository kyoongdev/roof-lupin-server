export interface ConfirmTossPaymentDTOProps {
    paymentKey: string;
    orderId: string;
    amount: number;
}
export declare class ConfirmTossPaymentDTO {
    paymentKey: string;
    orderId: string;
    amount: number;
    constructor(props?: ConfirmTossPaymentDTOProps);
}
