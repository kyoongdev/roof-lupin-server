export interface ProductDTOProps {
    name: string;
    quantity: number;
    unitAmount: number;
    currency: string;
    description: string;
}
export declare class ProductDTO {
    name: string;
    quantity: number;
    unitAmount: number;
    currency: string;
    description: string;
    constructor(props: ProductDTOProps);
}
