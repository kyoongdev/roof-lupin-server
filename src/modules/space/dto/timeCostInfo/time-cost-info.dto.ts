import { Property } from 'wemacu-nestjs';

export interface TimeCostInfoDTOProps {
  id: string;
  cost: number;
  startAt: number;
  endAt: number;
}

export class TimeCostInfoDTO {
  @Property({ apiProperty: { type: 'string', description: '시간별 가격 id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '시간별 가격' } })
  cost: number;

  @Property({ apiProperty: { type: 'number', description: '시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '종료 시간' } })
  endAt: number;

  constructor(props: TimeCostInfoDTOProps) {
    this.id = props.id;
    this.cost = props.cost;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }
}
