import { Property } from 'wemacu-nestjs';

import { HostDTO, HostDTOProps } from '@/modules/host/dto';
import { ReservationDTO, ReservationDTOProps } from '@/modules/reservation/dto';

import { SettlementDTO, SettlementDTOProps } from './settlement.dto';

export interface SettlementDetailDTOProps extends SettlementDTOProps {
  reservations: ReservationDTOProps[];
  host: HostDTOProps;
}

export class SettlementDetailDTO extends SettlementDTO {
  @Property({ apiProperty: { type: ReservationDTO, isArray: true, description: '예약 정보' } })
  reservations: ReservationDTO[];

  @Property({ apiProperty: { type: HostDTO, description: '호스트 정보' } })
  host: HostDTO;

  constructor(props: SettlementDetailDTOProps) {
    super(props);
    this.reservations = props.reservations.map((reservation) => new ReservationDTO(reservation));
    this.host = new HostDTO(props.host);
  }
}
