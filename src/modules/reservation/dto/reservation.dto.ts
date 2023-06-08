import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface ReservationDTOProps {
  id: string;
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
  cost: number;
  rentalTypeId: string;
  userId: string;
  space: SpaceDTOProps;
}

export class ReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '예약 년도' } })
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

  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  userId: string;

  @Property({ apiProperty: { type: SpaceDTO, description: '공간 정보' } })
  space: SpaceDTO;

  constructor(props: ReservationDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.cost = props.cost;
    this.rentalTypeId = props.rentalTypeId;
    this.userId = props.userId;
    this.space = new SpaceDTO(props.space);
  }
}
