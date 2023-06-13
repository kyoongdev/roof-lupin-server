import { Property } from 'wemacu-nestjs';

import { TimeCostInfoDTO, TimeCostInfoDTOProps } from '../timeCostInfo';
import {
  RENTAL_TYPE_ENUM,
  RENTAL_TYPE_KEYS,
  RentalTypeRequestTransForm,
  RentalTypeResTransForm,
} from '../validation/rental-type.validation';

export interface RentalTypeDTOProps {
  id: string;
  name: string;
  baseCost: number;
  rentalType: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  spaceId: string;
  timeCostInfo?: TimeCostInfoDTOProps[];
}

export class RentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여타입 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '대여타입 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '기본 가격' } })
  baseCost: number;

  @RentalTypeResTransForm()
  @Property({ apiProperty: { type: 'string', description: RENTAL_TYPE_KEYS.join(',') } })
  rentalType: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } })
  baseHour?: number;

  @Property({ apiProperty: { type: 'number', description: '시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '종료 시간' } })
  endAt: number;

  @Property({ apiProperty: { type: TimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } })
  timeCostInfos?: TimeCostInfoDTOProps[];

  @Property({ apiProperty: { type: 'string', description: '공간 ID' } })
  spaceId: string;

  constructor(props: RentalTypeDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.baseCost = props.baseCost;
    this.rentalType = props.rentalType;
    this.baseHour = props.baseHour ?? null;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.spaceId = props.spaceId;
    if (props.rentalType === RENTAL_TYPE_ENUM.TIME)
      this.timeCostInfos = props.timeCostInfo.map((timeCostInfo) => new TimeCostInfoDTO(timeCostInfo));
  }
}
