import { HostDTO, HostDTOProps } from '@/modules/host/dto';
export interface TaxReturnDTOProps {
    id: string;
    year: string;
    month: string;
    cost: number;
    receiptUrl?: string;
    submittedAt?: Date;
    host: HostDTOProps;
}
export declare class TaxReturnDTO {
    id: string;
    year: string;
    month: string;
    cost: number;
    receiptUrl?: string;
    submittedAt?: Date;
    host: HostDTO;
    constructor(props: TaxReturnDTOProps);
}
