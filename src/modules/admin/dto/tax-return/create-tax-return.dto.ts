import { Property } from 'cumuco-nestjs';

import { WordLengthValidation } from '@/utils/validation';

export interface CreateTaxReturnDTOProps {
  year: number;
  month: number;
  cost: number;
  receiptUrl?: string;
  hostId: string;
}

export class CreateTaxReturnDTO {
  @Property({ apiProperty: { type: 'number', description: ' 세금계산서 신고 연도 ' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: ' 세금계산서 신고 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '신고 금액' } })
  cost: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '영수증 url' } })
  receiptUrl?: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 id' } })
  hostId: string;

  constructor(props?: CreateTaxReturnDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.cost = props.cost;
      this.receiptUrl = props.receiptUrl;
      this.hostId = props.hostId;
    }
  }
}
