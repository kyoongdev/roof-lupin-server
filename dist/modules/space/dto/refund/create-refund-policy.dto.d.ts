export interface CreateRefundPolicyDTOProps {
    refundRate: number;
    daysBefore: number;
    daysBeforeType: number;
}
export declare class CreateRefundPolicyDTO {
    refundRate: number;
    daysBefore: number;
    constructor(props?: CreateRefundPolicyDTOProps);
}
