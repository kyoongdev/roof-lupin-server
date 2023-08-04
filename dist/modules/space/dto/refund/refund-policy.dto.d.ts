export interface RefundPolicyDTOProps {
    id: string;
    refundRate: number;
    daysBefore: number;
}
export declare class RefundPolicyDTO {
    id: string;
    refundRate: number;
    daysBefore: number;
    constructor(props: RefundPolicyDTOProps);
}
