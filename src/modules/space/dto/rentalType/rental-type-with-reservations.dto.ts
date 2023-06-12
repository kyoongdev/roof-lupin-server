import { Property } from 'wemacu-nestjs';

import { ReservationDTO, ReservationDTOProps } from '@/modules/reservation/dto';

import { RentalTypeDTO, RentalTypeDTOProps } from './rental-type.dto';

export interface RentalTypeWithReservationsDTOProps extends RentalTypeDTOProps {
  reservations: ReservationDTOProps[];
}

export class RentalTypeWithReservationDTO extends RentalTypeDTO {
  @Property({ apiProperty: { type: ReservationDTO, isArray: true, description: '예약 정보' } })
  reservations: ReservationDTO[];

  constructor(props: RentalTypeWithReservationsDTOProps) {
    super(props);
    this.reservations = props.reservations.map((reservation) => new ReservationDTO(reservation));
  }
}
