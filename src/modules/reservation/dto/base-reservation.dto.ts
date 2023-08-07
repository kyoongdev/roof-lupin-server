import { Property } from 'cumuco-nestjs';

export interface BaseReservationDTOProps {
  id: string;
  year: string;
  month: string;
  day: string;
  code: string;
  userCount: number;
  totalCost: number;
  vatCost: number;
  discountCost: number;
  originalCost: number;
  isCanceled: boolean;
  userName: string;
  userPhoneNumber: string;
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

  @Property({ apiProperty: { type: 'string', description: '예약 코드' } })
  code: string;

  @Property({ apiProperty: { type: 'number', description: '결제 금액 (originalCost - discountCost)' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '유저 수' } })
  userCount: number;

  @Property({ apiProperty: { type: 'boolean', description: '취소여부' } })
  isCanceled: boolean;

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

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '결제 날짜' } })
  payedAt?: Date;

  @Property({ apiProperty: { type: 'string', description: '유저 이름' } })
  userName: string;

  @Property({ apiProperty: { type: 'string', description: '유저 전화번호' } })
  userPhoneNumber: string;

  constructor(props: BaseReservationDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.code = props.code;
    this.totalCost = props.totalCost;
    this.vatCost = props.vatCost;
    this.discountCost = props.discountCost;
    this.originalCost = props.originalCost;
    this.isCanceled = props.isCanceled;
    this.payedAt = props.payedAt;
    this.userCount = props.userCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.userName = props.userName;
    this.userPhoneNumber = props.userPhoneNumber;
  }
}
