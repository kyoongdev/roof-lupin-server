import { Property } from 'cumuco-nestjs';

export interface UserSettingDTOProps {
  id: string;
  isAdult: boolean;
  isAlarmAccepted: boolean;
  isLocationInfoAccepted: boolean;
  isEmailAccepted: boolean;
  isKakaoTalkAccepted: boolean;
  isPushAccepted: boolean;
}

export class UserSettingDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'boolean', description: '성인 인증 여부' } })
  isAdult: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '알림 수신 동의 여부' } })
  isAlarmAccepted: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '위치 정보 수집 동의 여부' } })
  isLocationInfoAccepted: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '이메일 수신 동의 여부' } })
  isEmailAccepted: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '카카오톡 알림 수신 동의 여부' } })
  isKakaoTalkAccepted: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '푸시 알림 수신 동의 여부' } })
  isPushAccepted: boolean;

  constructor(props: UserSettingDTOProps) {
    this.id = props.id;
    this.isAdult = props.isAdult;
    this.isAlarmAccepted = props.isAlarmAccepted;
    this.isLocationInfoAccepted = props.isLocationInfoAccepted;
    this.isEmailAccepted = props.isEmailAccepted;
    this.isKakaoTalkAccepted = props.isKakaoTalkAccepted;
    this.isPushAccepted = props.isPushAccepted;
  }
}
