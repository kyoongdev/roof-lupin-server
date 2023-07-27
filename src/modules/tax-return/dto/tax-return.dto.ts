import { Property } from 'cumuco-nestjs';

import { HostDTO, HostDTOProps } from '@/modules/host/dto';

export interface TaxReturnDTOProps {
  id: string;
  year: string;
  month: string;
  cost: number;
  receiptUrl?: string;
  submittedAt?: Date;
  host: HostDTOProps;
}

export class TaxReturnDTO {
  @Property({ apiProperty: { type: 'string', description: ' 세금계산서 신고 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: ' 세금계산서 신고 연도 ' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: ' 세금계산서 신고 월' } })
  month: string;

  @Property({ apiProperty: { type: 'number', description: '신고 금액' } })
  cost: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '영수증 url' } })
  receiptUrl?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, format: 'date-format', description: '신고일' } })
  submittedAt?: Date;

  @Property({ apiProperty: { type: HostDTO, description: '호스트 정보' } })
  host: HostDTO;

  constructor(props: TaxReturnDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.cost = props.cost;
    this.receiptUrl = props.receiptUrl;
    this.submittedAt = props.submittedAt;
    this.host = new HostDTO(props.host);
  }
}
