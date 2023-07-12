import { Property } from 'wemacu-nestjs';

export interface BaseReservationDTOProps {
  id: string;
  year: string;
  month: string;
  day: string;

  totalCost: number;
  vatCost: number;
  discountCost: number;
  originalCost: number;
  payedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '예약 년도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 일' } })
  day: string;

  @Property({ apiProperty: { type: 'number', description: '결제 금액 (originalCost - discountCost)' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: 'VAT 금액' } })
  vatCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '총액 - 할인가가 적용되지 않은 금액' } })
  originalCost: number;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '생성 날짜' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '수정 날짜' } })
  updatedAt: Date;

  constructor(props: BaseReservationDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.totalCost = props.totalCost;
    this.vatCost = props.vatCost;
    this.discountCost = props.discountCost;
    this.originalCost = props.originalCost;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
