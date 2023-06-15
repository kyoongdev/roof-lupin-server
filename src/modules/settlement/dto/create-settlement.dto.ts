import { Property } from 'wemacu-nestjs';

export interface CreateSettlementDTOProps {
  year: string;
  month: string;
  day: string;
  settlementCost: number;
  totalCost: number;
  taxFreeCost: number;
  discountCost: number;
  originalCost: number;
}

export class CreateSettlementDTO {
  @Property({ apiProperty: { type: 'string', description: '정산 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '정산 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '정산 일' } })
  day: string;

  @Property({ apiProperty: { type: 'number', description: '정산 금액' } })
  settlementCost: number;

  @Property({ apiProperty: { type: 'number', description: '총 결제 금액' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '비과세 금액' } })
  taxFreeCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '총액 - 할인가가 적용되지 않은 금액' } })
  originalCost: number;

  constructor(props?: CreateSettlementDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.settlementCost = props.settlementCost;
      this.totalCost = props.totalCost;
      this.taxFreeCost = props.taxFreeCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
    }
  }
}
