import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface CurationSpaceDTOProps {
  orderNo: number;
  space: SpaceDTOProps;
}

export class CurationSpaceDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  @Property({ apiProperty: { type: SpaceDTO, description: '공간' } })
  space: SpaceDTO;

  constructor(props: CurationSpaceDTOProps) {
    this.orderNo = props.orderNo;
    this.space = new SpaceDTO(props.space);
  }
}
