import { Property } from 'cumuco-nestjs';

import { CreateTaxReturnDTOProps } from './create-tax-return.dto';

export type UpdateTaxReturnDTOProps = Omit<Partial<CreateTaxReturnDTOProps>, 'hostId'>;

export class UpdateTaxReturnDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: ' 세금계산서 신고 연도 ' } })
  year: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: ' 세금계산서 신고 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '신고 금액' } })
  cost: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '영수증 url' } })
  receiptUrl?: string;

  constructor(props?: UpdateTaxReturnDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.cost = props.cost;
      this.receiptUrl = props.receiptUrl;
    }
  }
}
