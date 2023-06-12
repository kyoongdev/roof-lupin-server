import { Property } from 'wemacu-nestjs';

import { TimeCostInfoDTO, TimeCostInfoDTOProps } from '../timeCostInfo';

export interface RentalTypeDTOProps {
  id: string;
  name: string;
  baseCost: number;
  rentalType: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  timeCostInfo?: TimeCostInfoDTOProps[];
}

export class RentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여타입 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '대여타입 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '기본 가격' } })
  baseCost: number;

  @Property({ apiProperty: { type: 'number', description: '대여타입 , 시간 | 패키지' } })
  rentalType: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } })
  baseHour?: number;

  @Property({ apiProperty: { type: 'number', description: '시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '종료 시간' } })
  endAt: number;

  @Property({ apiProperty: { type: TimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } })
  timeCostInfos?: TimeCostInfoDTOProps[];

  constructor(props: RentalTypeDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.baseCost = props.baseCost;
    this.rentalType = RentalTypeDTO.convertRentalType(props.rentalType);
    this.baseHour = props.baseHour ?? null;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.timeCostInfos = props.timeCostInfo
      ? props.timeCostInfo.map((timeCostInfo) => new TimeCostInfoDTO(timeCostInfo))
      : null;
  }

  static convertRentalType(rentalType: number) {
    if (rentalType === 1) {
      return '시간';
    } else {
      return '패키지';
    }
  }
}
