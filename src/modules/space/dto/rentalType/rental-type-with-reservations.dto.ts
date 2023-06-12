import { Property } from 'wemacu-nestjs';

import { BaseReservationDTO, BaseReservationDTOProps } from '@/modules/reservation/dto';

import { RentalTypeDTO, RentalTypeDTOProps } from './rental-type.dto';

export interface RentalTypeWithReservationsDTOProps extends RentalTypeDTOProps {
  reservations: BaseReservationDTOProps[];
  spaceId: string;
}

export class RentalTypeWithReservationDTO extends RentalTypeDTO {
  @Property({ apiProperty: { type: BaseReservationDTO, isArray: true, description: '예약 정보' } })
  reservations: BaseReservationDTO[];

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props: RentalTypeWithReservationsDTOProps) {
    super(props);
    this.reservations = props.reservations.map((reservation) => new BaseReservationDTO(reservation));
    this.spaceId = props.spaceId;
  }
}
