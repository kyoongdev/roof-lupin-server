import { Property } from 'cumuco-nestjs';

export interface AlarmResultDTOProps {
  userId: string;
}

export class AlarmResultDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  userId: string;

  constructor(props: AlarmResultDTOProps) {
    this.userId = props.userId;
  }
}
