export interface CreateSettlementDTOProps {
    year: string;
    month: string;
    day: string;
    hostId: string;
    settlementCost: number;
    totalCost: number;
    vatCost: number;
    discountCost: number;
    originalCost: number;
    reservationIds?: string[];
}
export declare class CreateSettlementDTO {
    year: string;
    month: string;
    day: string;
    hostId: string;
    settlementCost: number;
    totalCost: number;
    vatCost: number;
    discountCost: number;
    originalCost: number;
    reservationIds?: string[];
    constructor(props?: CreateSettlementDTOProps);
}
