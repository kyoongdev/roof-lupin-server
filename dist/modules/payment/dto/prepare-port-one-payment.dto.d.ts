export interface PortOnePreparePaymentDTOProps {
    merchant_uid: string;
    name: string;
    amount: number;
}
export declare class PortOnePreparePaymentDTO {
    merchant_uid: string;
    name: string;
    amount: number;
    constructor(props: PortOnePreparePaymentDTOProps);
}
