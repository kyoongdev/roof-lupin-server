import { Property } from 'wemacu-nestjs';

import {
  BaseReservationDTO,
  BaseReservationDTOProps,
  ReservationDTO,
  ReservationDTOProps,
} from '@/modules/reservation/dto';

import { RentalTypeDTO, RentalTypeDTOProps } from './rental-type.dto';

export interface RentalTypeWithReservationsDTOProps extends RentalTypeDTOProps {
  reservations: ReservationDTOProps[];
  spaceId: string;
}

export class RentalTypeWithReservationDTO extends RentalTypeDTO {
  @Property({ apiProperty: { type: ReservationDTO, isArray: true, description: '예약 정보' } })
  reservations: ReservationDTO[];

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props: RentalTypeWithReservationsDTOProps) {
    super(props);
    this.reservations = props.reservations.map((reservation) => new ReservationDTO(reservation));
    this.spaceId = props.spaceId;
  }
}
