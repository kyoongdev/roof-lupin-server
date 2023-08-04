import { RentalTypeDTO, type RentalTypeDTOProps } from '@/modules/space/dto/rental-type';
export interface ReservationRentalTypeDTOProps {
    rentalTypeId: string;
    startAt: number;
    endAt: number;
    rentalType: RentalTypeDTOProps;
}
export declare class ReservationRentalTypeDTO {
    rentalTypeId: string;
    startAt: number;
    endAt: number;
    rentalType: RentalTypeDTO;
    constructor(props: ReservationRentalTypeDTOProps);
}
