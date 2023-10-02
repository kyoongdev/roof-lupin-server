import { Property } from 'cumuco-nestjs';

export interface UpdateUserSettingDTOProps {
  isAdult?: boolean;
  isAlarmAccepted?: boolean;
  isLocationInfoAccepted?: boolean;
  isEmailAccepted?: boolean;
  isKakaoTalkAccepted?: boolean;
  isPushAccepted?: boolean;
}

export class UpdateUserSettingDTO {
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '성인 인증 여부' } })
  isAdult?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '알림 수신 동의 여부' } })
  isAlarmAccepted?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '위치 정보 수집 동의 여부' } })
  isLocationInfoAccepted?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '이메일 수신 동의 여부' } })
  isEmailAccepted?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '카카오톡 알림 수신 동의 여부' } })
  isKakaoTalkAccepted?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '푸시 알림 수신 동의 여부' } })
  isPushAccepted?: boolean;

  constructor(props: UpdateUserSettingDTOProps) {
    if (props) {
      this.isAdult = props.isAdult;
      this.isAlarmAccepted = props.isAlarmAccepted;
      this.isLocationInfoAccepted = props.isLocationInfoAccepted;
      this.isEmailAccepted = props.isEmailAccepted;
      this.isKakaoTalkAccepted = props.isKakaoTalkAccepted;
      this.isPushAccepted = props.isPushAccepted;
    }
  }
}
