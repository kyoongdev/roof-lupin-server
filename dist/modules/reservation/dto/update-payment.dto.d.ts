export declare enum PayMethod {
    PORT_ONE = 1,
    TOSS_PAY = 2,
    KAKAO_PAY = 3
}
export interface UpdatePaymentDTOProps {
    totalCost?: number;
    vatCost?: number;
    discountCost?: number;
    originalCost?: number;
    orderId?: string;
    orderResultId?: string;
    payMethod?: PayMethod;
    payedAt?: Date;
    refundCost?: number;
}
export declare class UpdatePaymentDTO {
    totalCost?: number;
    vatCost?: number;
    discountCost?: number;
    originalCost?: number;
    orderId?: string;
    orderResultId?: string;
    payMethod?: PayMethod;
    payedAt?: Date;
    refundCost?: number;
    constructor(props?: UpdatePaymentDTOProps);
}
