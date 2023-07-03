import { Property } from 'wemacu-nestjs';

import { CreatePaymentDTO, CreatePaymentDTOProps } from './create-payment';
import { TimeValidation } from './validation';

export interface UpdateReservationDTOProps {
  year?: string;
  month?: string;
  day?: string;
  startAt?: number;
  endAt?: number;
  totalCost?: number;
  discountCost?: number;
  originalCost?: number;
  isApproved?: boolean;
}

export class UpdateReservationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 연도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 일' } })
  day?: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 시작 시간 (0 ~ 24)' } })
  startAt?: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 종료 시간 (0 ~ 24)' } })
  endAt?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 비용' } })
  totalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } })
  discountCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인제외 예약 비용' } })
  originalCost?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } })
  isApproved?: boolean;

  constructor(props?: UpdateReservationDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.totalCost = props.totalCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.isApproved = props.isApproved;
    }
  }
}
