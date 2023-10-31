import { Property } from 'cumuco-nestjs';

export interface SettlementMonthDTOProps {
  month: number;
}

export class SettlementMonthDTO {
  @Property({ apiProperty: { type: 'number', description: '정상 월' } })
  month: number;

  constructor(props: SettlementMonthDTOProps) {
    this.month = props.month;
  }
}
