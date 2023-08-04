import { PossibleRentalTypePagingDTOProps } from '../query/possible-rental-type-paging.dto';
import { PossibleRentalTypePaginationDTO } from './possible-rental-type-pagination.dto';
import { PossibleRentalTypesByMonthDTO, PossibleRentalTypesByMonthDTOProps } from './possible-rental-types-by-month.dto';
export interface PaginationPossibleRentalTypesByMonthDTOProps {
    paging: PossibleRentalTypePagingDTOProps;
    data: PossibleRentalTypesByMonthDTOProps[];
}
export declare class PaginationPossibleRentalTypesByMonthDTO {
    paging: PossibleRentalTypePaginationDTO;
    data: PossibleRentalTypesByMonthDTO[];
    constructor(props: PaginationPossibleRentalTypesByMonthDTOProps);
}
