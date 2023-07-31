import { Property } from 'cumuco-nestjs';

import { DayResDecorator } from '@/utils/validation/day.validation';

import { AdditionalServiceDTO, AdditionalServiceDTOProps } from '../additional-service';
import { TimeCostInfoDTO, TimeCostInfoDTOProps } from '../timeCostInfo';
import { RENTAL_TYPE_ENUM, RENTAL_TYPE_KEYS, RentalTypeResTransForm } from '../validation/rental-type.validation';

export interface RentalTypeDTOProps {
  id: string;
  name: string;
  baseCost: number;
  rentalType: number;
  day: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  spaceId: string;
  timeCostInfo?: TimeCostInfoDTOProps[];
  additionalServices: AdditionalServiceDTOProps[];
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

  @DayResDecorator()
  day: number;

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

  @Property({ apiProperty: { type: AdditionalServiceDTO, isArray: true, description: '추가 서비스 목록' } })
  additionalServices: AdditionalServiceDTO[];

  constructor(props: RentalTypeDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.baseCost = props.baseCost;
    this.rentalType = props.rentalType;
    this.day = props.day;
    this.baseHour = props.baseHour ?? null;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.spaceId = props.spaceId;
    this.additionalServices =
      props.additionalServices?.map((additionalService) => new AdditionalServiceDTO(additionalService)) ?? [];
    if (props.rentalType === RENTAL_TYPE_ENUM.TIME)
      this.timeCostInfos = props.timeCostInfo.map((timeCostInfo) => new TimeCostInfoDTO(timeCostInfo));
  }
}
