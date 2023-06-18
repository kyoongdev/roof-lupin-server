import { Property } from 'wemacu-nestjs';

import { WordLengthValidation } from '@/utils/validation';

export interface CreateTaxReturnDTOProps {
  year: string;
  month: string;
  cost: number;
  receiptUrl?: string;
  hostId: string;
}

export class CreateTaxReturnDTO {
  @WordLengthValidation(4)
  @Property({ apiProperty: { type: 'string', description: ' 세금계산서 신고 연도 ' } })
  year: string;

  @WordLengthValidation(2, 1)
  @Property({ apiProperty: { type: 'string', description: ' 세금계산서 신고 월' } })
  month: string;

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
