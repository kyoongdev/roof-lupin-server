import { Property } from 'cumuco-nestjs';

import { IconDTO, IconDTOProps } from './icon.dto';

export interface IconDetailDTOProps extends IconDTOProps {
  inUse: boolean;
}

export class IconDetailDTO extends IconDTO {
  @Property({ apiProperty: { type: 'boolean', description: '사용 유무' } })
  inUse: boolean;

  constructor(props: IconDetailDTOProps) {
    super(props);
    this.inUse = props.inUse;
  }
}
