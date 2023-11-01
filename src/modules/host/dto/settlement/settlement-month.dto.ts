import { Property } from 'cumuco-nestjs';

export interface SettlementMonthDTOProps {
  id: string;
  year: number;
  month: number;
}

export class SettlementMonthDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '정상 연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '정상 월' } })
  month: number;

  constructor(props: SettlementMonthDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
  }
}
