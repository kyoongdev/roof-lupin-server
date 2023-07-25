import { Property } from 'wemacu-nestjs';

import { TimeCostInfoDTOProps } from '../timeCostInfo';

export interface TimeRentalTypeDTOProps {
  id: string;
  name: string;
  timeCostInfos?: TimeCostInfoDTOProps[];
}

export class TimeRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '랜탈 타입 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '랜탈 타입 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '최소가' } })
  minCost: number;

  @Property({ apiProperty: { type: 'number', description: '최대가' } })
  maxCost: number;

  constructor(props: TimeRentalTypeDTOProps) {
    const costs = props.timeCostInfos.map((info) => info.cost);
    this.id = props.id;
    this.name = props.name;
    this.minCost = Math.min(...costs);
    this.maxCost = Math.max(...costs);
  }
}
