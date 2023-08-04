import { AdditionalServiceReservationDTO, AdditionalServiceReservationDTOProps } from '@/modules/space/dto/additional-service';
export interface CreateReservationRentalTypeDTOProps {
    rentalTypeId: string;
    startAt: number;
    endAt: number;
    additionalServices?: AdditionalServiceReservationDTOProps[];
}
export declare class CreateReservationRentalTypeDTO {
    rentalTypeId: string;
    startAt: number;
    endAt: number;
    additionalServices?: AdditionalServiceReservationDTO[];
    constructor(props?: CreateReservationRentalTypeDTOProps);
}
