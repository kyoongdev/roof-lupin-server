import { Property } from 'cumuco-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface CurationSpaceDTOProps extends SpaceDTOProps {
  curationOrderNo?: number;
}

export class CurationSpaceDTO extends SpaceDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  curationOrderNo?: number;

  constructor(props: CurationSpaceDTOProps) {
    super(props);
    this.curationOrderNo = props.curationOrderNo || null;
  }
}
