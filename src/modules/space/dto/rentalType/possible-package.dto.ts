import { Property } from 'wemacu-nestjs';

export interface PossiblePackageDTOProps {
  id: string;
  name: string;
  baseCost: number;
  rentalType: string;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  isPossible: boolean;
}

export class PossiblePackageDTO {
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

  @Property({ apiProperty: { type: 'boolean', description: '대여 가능 여부' } })
  isPossible: boolean;

  constructor(props: PossiblePackageDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.baseCost = props.baseCost;
    this.rentalType = props.rentalType;
    this.baseHour = props.baseHour;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.isPossible = props.isPossible;
  }
}
