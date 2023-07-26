import { Property } from 'cumuco-nestjs';

export interface AlarmResultsDTOProps {
  userIds: string[];
}

export class AlarmResultsDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '유저 아이디들' } })
  userIds: string[];

  constructor(props: AlarmResultsDTOProps) {
    this.userIds = props.userIds;
  }
}
