export interface UpdateSettlementDTOProps {
    year?: string;
    month?: string;
    day?: string;
    settlementCost?: number;
    totalCost?: number;
    vatCost?: number;
    discountCost?: number;
    originalCost?: number;
    reservationIds?: string[];
}
export declare class UpdateSettlementDTO {
    year?: string;
    month?: string;
    day?: string;
    settlementCost?: number;
    totalCost?: number;
    vatCost?: number;
    discountCost?: number;
    originalCost?: number;
    reservationIds?: string[];
    constructor(props?: UpdateSettlementDTOProps);
}
