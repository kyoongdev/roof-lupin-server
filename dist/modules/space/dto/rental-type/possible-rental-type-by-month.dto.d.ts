import { PossibleRentalTypesDTO, PossibleRentalTypesDTOProps } from './possible-rental-types.dto';
export interface PossibleRentalTypeByMonthDTOProps {
    day: string;
    isPossible: boolean;
    isHoliday: boolean;
    rentalType: PossibleRentalTypesDTOProps;
}
export declare class PossibleRentalTypeByMonthDTO {
    day: string;
    isPossible: boolean;
    isHoliday: boolean;
    rentalType: PossibleRentalTypesDTO;
    constructor(props: PossibleRentalTypeByMonthDTOProps);
}
