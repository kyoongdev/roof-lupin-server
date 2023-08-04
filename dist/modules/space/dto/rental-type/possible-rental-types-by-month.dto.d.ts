import { PossibleRentalTypeByMonthDTO, PossibleRentalTypeByMonthDTOProps } from './possible-rental-type-by-month.dto';
export interface PossibleRentalTypesByMonthDTOProps {
    year: string;
    month: string;
    days: PossibleRentalTypeByMonthDTOProps[];
}
export declare class PossibleRentalTypesByMonthDTO {
    year: string;
    month: string;
    days: PossibleRentalTypeByMonthDTO[];
    constructor(props: PossibleRentalTypesByMonthDTOProps);
}
