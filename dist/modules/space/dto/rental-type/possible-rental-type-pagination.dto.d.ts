import { PossibleRentalTypePagingDTOProps } from '../query/possible-rental-type-paging.dto';
export declare class PossibleRentalTypePaginationDTO {
    page: number;
    limit: number;
    maxSize: number;
    hasPrev: boolean;
    hasNext: boolean;
    constructor(props: PossibleRentalTypePagingDTOProps);
}
