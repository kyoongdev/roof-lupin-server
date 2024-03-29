import { Property } from 'cumuco-nestjs';

import { BaseCreateBlockedTimeDTO, BaseCreateBlockedTimeDTOProps } from './base-create-blocked-time.dto';

export interface CreateBlockedTimeDTOProps extends BaseCreateBlockedTimeDTOProps {
  spaceId: string;
  name: string;
}

export class CreateBlockedTimeDTO extends BaseCreateBlockedTimeDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'string', description: '차단된 시간 이름' } })
  name: string;

  constructor(props?: CreateBlockedTimeDTOProps) {
    super(props);
    if (props) {
      this.spaceId = props.spaceId;
      this.name = props.name;
    }
  }
}
