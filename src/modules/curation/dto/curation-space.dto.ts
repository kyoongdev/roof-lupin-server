import { Property } from 'cumuco-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface CurationSpaceDTOProps extends SpaceDTOProps {
  orderNo: number;
}

export class CurationSpaceDTO extends SpaceDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  constructor(props: CurationSpaceDTOProps) {
    super(props);
    this.orderNo = props.orderNo;
  }
}
