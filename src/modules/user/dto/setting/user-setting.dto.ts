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
  @Property({ apiProperty: { type: 'boolean', description: '' } })
  isAdult: boolean;
}
