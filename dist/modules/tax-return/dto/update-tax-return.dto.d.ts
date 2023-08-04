import { CreateTaxReturnDTOProps } from './create-tax-return.dto';
export type UpdateTaxReturnDTOProps = Omit<Partial<CreateTaxReturnDTOProps>, 'hostId'>;
export declare class UpdateTaxReturnDTO {
    year: string;
    month: string;
    cost: number;
    receiptUrl?: string;
    constructor(props?: UpdateTaxReturnDTOProps);
}
