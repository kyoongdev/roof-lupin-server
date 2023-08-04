export interface CreateTaxReturnDTOProps {
    year: string;
    month: string;
    cost: number;
    receiptUrl?: string;
    hostId: string;
}
export declare class CreateTaxReturnDTO {
    year: string;
    month: string;
    cost: number;
    receiptUrl?: string;
    hostId: string;
    constructor(props?: CreateTaxReturnDTOProps);
}
