import { Property } from 'wemacu-nestjs';

export interface TimeCostInfoDTOProps {
  cost: number;
  time: number;
}

export class TimeCostInfoDTO {
  @Property({ apiProperty: { type: 'number', description: '시간별 가격' } })
  cost: number;

  @Property({ apiProperty: { type: 'number', description: '시작 시간' } })
  time: number;

  constructor(props: TimeCostInfoDTOProps) {
    this.cost = props.cost;
    this.time = props.time;
  }
}
