import { Property } from 'cumuco-nestjs';

import { UserSettingDTO, UserSettingDTOProps } from './setting';

export interface PushTokenDTOProps {
  id: string;
  nickname?: string;
  name?: string;
  pushToken?: string;
  phoneNumber: string;
  setting: UserSettingDTOProps;
}

export class PushTokenDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 닉네임' } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '푸시 토큰' } })
  pushToken?: string;

  @Property({ apiProperty: { type: 'string', description: '유저 전화번호' } })
  phoneNumber: string;

  @Property({ apiProperty: { type: UserSettingDTO, description: '유저 설정' } })
  setting: UserSettingDTO;

  constructor(props: PushTokenDTOProps) {
    this.pushToken = props.pushToken;
    this.id = props.id;
    this.nickname = props.nickname;
    this.name = props.name;
    this.phoneNumber = props.phoneNumber;
    this.setting = new UserSettingDTO(props.setting);
  }
}
