import { Property } from 'wemacu-nestjs';

import { WordLengthValidation } from '@/utils/validation';

import { CreateTaxReturnDTOProps } from './create-tax-return.dto';

export type UpdateTaxReturnDTOProps = Omit<Partial<CreateTaxReturnDTOProps>, 'hostId'>;

export class UpdateTaxReturnDTO {
  @WordLengthValidation(4)
  @Property({ apiProperty: { type: 'string', nullable: true, description: ' 세금계산서 신고 연도 ' } })
  year: string;

  @WordLengthValidation(2, 1)
  @Property({ apiProperty: { type: 'string', nullable: true, description: ' 세금계산서 신고 월' } })
  month: string;

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
