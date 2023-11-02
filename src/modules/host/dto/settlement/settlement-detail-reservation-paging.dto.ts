import { PagingDTO, PagingMetaDTO, Property } from 'cumuco-nestjs';

import { SettlementDetailDTO } from './settlement-detail.dto';

export interface SettlementDetailReservationPagingDTOProps {
  count: number;
  paging: PagingDTO;
}

export class SettlementDetailReservationPagingDTO {
  @Property({ apiProperty: { type: SettlementDetailDTO } })
  data: SettlementDetailDTO;

  @Property({ apiProperty: { type: PagingMetaDTO } })
  paging: PagingMetaDTO;

  constructor(data: SettlementDetailDTO, props: SettlementDetailReservationPagingDTOProps) {
    this.data = data;
    this.paging = new PagingMetaDTO(props);
  }
}
