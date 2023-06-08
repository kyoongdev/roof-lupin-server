import { Property } from 'wemacu-nestjs';

import { GenderValidation } from '@/utils/validation';

export interface CreateReservationDTOProps {
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
  cost: number;
  rentalTypeId: string;
  spaceId: string;
}

export class CreateReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 일' } })
  day: string;

  @Property({ apiProperty: { type: 'number', description: '예약 시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '예약 종료 시간' } })
  endAt: number;

  @Property({ apiProperty: { type: 'number', description: '예약 비용' } })
  cost: number;

  @Property({ apiProperty: { type: 'string', description: '대여 타입 아이디' } })
  rentalTypeId: string;

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  constructor(props?: CreateReservationDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.cost = props.cost;
      this.rentalTypeId = props.rentalTypeId;
      this.spaceId = props.spaceId;
    }
  }
}
