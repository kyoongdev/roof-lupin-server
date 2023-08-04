import { CommonReservation } from '@/interface/reservation.interface';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
import { BaseReservationDTO, BaseReservationDTOProps } from './base-reservation.dto';
import { ReservationRentalTypeDTO, ReservationRentalTypeDTOProps } from './reservation-rental-type.dto';
export interface ReservationDTOProps extends BaseReservationDTOProps {
    user: CommonUserProps;
    rentalTypes: ReservationRentalTypeDTOProps[];
    space: SpaceDTOProps;
    isReviewed: boolean;
}
export declare class ReservationDTO extends BaseReservationDTO {
    user: CommonUserDTO;
    rentalTypes: ReservationRentalTypeDTO[];
    space: SpaceDTO;
    isReviewed: boolean;
    constructor(props: ReservationDTOProps);
    static generateReservationDTO(reservation: CommonReservation): ReservationDTOProps;
}
