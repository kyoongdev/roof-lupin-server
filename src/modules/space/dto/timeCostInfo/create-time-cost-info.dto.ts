import { Property } from 'cumuco-nestjs';

export interface CreateTimeCostInfoDTOProps {
  cost: number;
  time: number;
}

export class CreateTimeCostInfoDTO {
  @Property({ apiProperty: { type: 'number', description: '시간별 가격' } })
  cost: number;

  @Property({
    apiProperty: { type: 'number', minimum: 9, maximum: 32, description: '시작 시간 9시부터 시작 ~ 0시부터는 +24해서' },
  })
  time: number;

  constructor(props?: CreateTimeCostInfoDTOProps) {
    if (props) {
      this.cost = props.cost;
      this.time = props.time;
    }
  }
}
