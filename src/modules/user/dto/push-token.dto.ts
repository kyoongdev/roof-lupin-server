import { Property } from 'cumuco-nestjs';

export interface PushTokenDTOProps {
  id: string;
  nickname?: string;
  name?: string;
  isAlarmAccepted: boolean;
  pushToken?: string;
}

export class PushTokenDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 닉네임' } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'boolean', description: '알림 수신 여부' } })
  isAlarmAccepted: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '푸시 토큰' } })
  pushToken: string | null;

  constructor(props: PushTokenDTOProps) {
    this.pushToken = props.pushToken ?? null;
    this.id = props.id;
    this.nickname = props.nickname;
    this.name = props.name;
    this.isAlarmAccepted = props.isAlarmAccepted;
  }
}
