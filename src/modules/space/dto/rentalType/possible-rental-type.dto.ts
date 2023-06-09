import { Property } from 'wemacu-nestjs';

import {
  PossibleTimeCostInfoDTO,
  type PossibleTimeCostInfoDTOProps,
} from '../timeCostInfo/possible-time-cost-info.dto';

export interface RentalTypeDTOProps {
  id: string;
  name: string;
  baseCost: number;
  rentalType: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  timeCostInfos?: PossibleTimeCostInfoDTOProps[];
}

export class PossibleRentalTypeDTO {
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
}
