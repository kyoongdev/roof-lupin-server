export interface EscrowProductDTOProps {
    id: string;
    name: string;
    code: string;
    unitPrice: string;
    quantity: string;
}
export declare class EscrowProductDTO {
    id: string;
    name: string;
    code: string;
    unitPrice: string;
    quantity: string;
    constructor(props: EscrowProductDTOProps);
}
