import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { RentalTypeDTO, RentalTypeDTOProps } from '@/modules/space/dto/rentalType';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface ReservationDTOProps {
  id: string;
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
  cost: number;
  user: CommonUserProps;
  rentalType: RentalTypeDTOProps;
  space: SpaceDTOProps;
  createdAt: Date;
  updatedAt: Date;
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

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: RentalTypeDTO, description: '대여 정보' } })
  rentalType: RentalTypeDTO;

  @Property({ apiProperty: { type: SpaceDTO, description: '공간 정보' } })
  space: SpaceDTO;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '생성 날짜' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '수정 날짜' } })
  updatedAt: Date;

  constructor(props: ReservationDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.cost = props.cost;
    this.user = new CommonUserDTO(props.user);
    this.rentalType = new RentalTypeDTO(props.rentalType);
    this.space = new SpaceDTO(props.space);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
