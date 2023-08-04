export interface PossibleRentalTypePagingDTOProps {
    page: number;
    limit: number;
    maxSize: number;
    startYear: string;
    startMonth: string;
}
export declare class PossibleRentalTypePagingDTO {
    page: number;
    limit: number;
    maxSize: number;
    startYear: string;
    startMonth: string;
    constructor(props?: PossibleRentalTypePagingDTOProps);
}
