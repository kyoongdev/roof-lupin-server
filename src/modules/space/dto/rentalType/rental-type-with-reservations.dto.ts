import { Property } from 'wemacu-nestjs';

import { BaseReservationDTO, BaseReservationDTOProps } from '@/modules/reservation/dto';

import { RentalTypeDTO, RentalTypeDTOProps } from './rental-type.dto';

export interface RentalTypeWithReservationsDTOProps extends RentalTypeDTOProps {
  reservations: BaseReservationDTOProps[];
}

export class RentalTypeWithReservationDTO extends RentalTypeDTO {
  @Property({ apiProperty: { type: BaseReservationDTO, isArray: true, description: '예약 정보' } })
  reservations: BaseReservationDTO[];

  constructor(props: RentalTypeWithReservationsDTOProps) {
    super(props);
    this.reservations = props.reservations.map((reservation) => new BaseReservationDTO(reservation));
  }
}
