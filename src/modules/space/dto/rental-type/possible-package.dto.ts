import { Property } from 'cumuco-nestjs';

import { DayResDecorator } from '@/utils/validation/day.validation';

import { AdditionalServiceDTO, AdditionalServiceDTOProps } from '../additional-service';
import { RENTAL_TYPE_KEYS, RentalTypeResTransForm } from '../validation/rental-type.validation';

export interface PossiblePackageDTOProps {
  id: string;
  name: string;
  baseCost: number;
  rentalType: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  day: number;
  spaceId: string;
  isPossible: boolean;
  additionalServices: AdditionalServiceDTOProps[];
}

export class PossiblePackageDTO {
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

  @DayResDecorator()
  day: number;

  @Property({ apiProperty: { type: 'number', description: '시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '종료 시간' } })
  endAt: number;

  @Property({ apiProperty: { type: 'boolean', description: '대여 가능 여부' } })
  isPossible: boolean;

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: AdditionalServiceDTO, isArray: true, description: '추가 서비스 목록' } })
  additionalServices: AdditionalServiceDTO[];

  constructor(props: PossiblePackageDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.baseCost = props.baseCost;
    this.rentalType = props.rentalType;
    this.baseHour = props.baseHour;
    this.day = props.day;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.spaceId = props.spaceId;
    this.isPossible = props.isPossible;
    this.additionalServices = props.additionalServices.map(
      (additionalService) => new AdditionalServiceDTO(additionalService)
    );
  }
}
