import { Property } from 'cumuco-nestjs';

import { BaseCreateBlockedTimeDTO, BaseCreateBlockedTimeDTOProps } from './base-create-blocked-time.dto';

export interface CreateBlockedTimesDTOProps {
  spaceId: string;
  name: string;
  blockTimes: BaseCreateBlockedTimeDTOProps[];
}

export class CreateBlockedTimesDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'string', description: '차단된 시간 이름' } })
  name: string;

  @Property({ apiProperty: { type: BaseCreateBlockedTimeDTO, isArray: true } })
  blockTimes: BaseCreateBlockedTimeDTO[];

  constructor(props: CreateBlockedTimesDTOProps) {
    if (props) {
      this.spaceId = props.spaceId;
      this.name = props.name;
      this.blockTimes = props.blockTimes.map((blockTime) => new BaseCreateBlockedTimeDTO(blockTime));
    }
  }
}
