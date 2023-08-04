import { ReservationDTO, ReservationDTOProps } from '@/modules/reservation/dto';
import { RentalTypeDTO, RentalTypeDTOProps } from './rental-type.dto';
export interface RentalTypeWithReservationsDTOProps extends RentalTypeDTOProps {
    reservations: ReservationDTOProps[];
    spaceId: string;
}
export declare class RentalTypeWithReservationDTO extends RentalTypeDTO {
    reservations: ReservationDTO[];
    spaceId: string;
    constructor(props: RentalTypeWithReservationsDTOProps);
}
