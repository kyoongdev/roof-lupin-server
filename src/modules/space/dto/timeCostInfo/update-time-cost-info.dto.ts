import { Property } from 'wemacu-nestjs';

import { CreateTimeCostInfoDTO, CreateTimeCostInfoDTOProps } from './create-time-cost-info.dto';

export interface UpdateTimeCostInfoDTOProps extends CreateTimeCostInfoDTOProps {
  isPossible?: boolean;
}

export class UpdateTimeCostInfoDTO extends CreateTimeCostInfoDTO {
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '예약 가능 여부' } })
  isPossible?: boolean;

  constructor(props?: UpdateTimeCostInfoDTOProps) {
    super(props);
    if (props) {
      this.isPossible = props.isPossible ?? true;
    }
  }
}
