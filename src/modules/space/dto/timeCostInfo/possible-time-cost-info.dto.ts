import { Property } from 'wemacu-nestjs';

import { TimeCostInfoDTO, TimeCostInfoDTOProps } from './time-cost-info.dto';

export interface PossibleTimeCostInfoDTOProps extends TimeCostInfoDTOProps {
  isPossible: boolean;
}

export class PossibleTimeCostInfoDTO extends TimeCostInfoDTO {
  @Property({ apiProperty: { type: 'boolean', description: '예약 가능 여부' } })
  isPossible: boolean;

  constructor(props: PossibleTimeCostInfoDTOProps) {
    super(props);
    this.isPossible = props.isPossible;
  }
}
