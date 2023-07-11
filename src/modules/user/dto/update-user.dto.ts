import { Property } from 'wemacu-nestjs';

import { GenderValidation } from '../../../utils/validation/gender.validate';

export interface UpdateUserDTOProps {
  nickname?: string;
  email?: string;
  phoneNumber?: string;
  birthDay?: string;
  birthYear?: string;
  gender?: number;
  profileImage?: string;
  pushToken?: string;
  isAdult?: boolean;
  isAlarmAccepted?: boolean;
}

export class UpdateUserDTO {
  @Property({ apiProperty: { type: 'string', description: '닉네임', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', description: '이메일', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', description: '연락처', nullable: true } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일', nullable: true, minLength: 4, maxLength: 4 } })
  birthDay?: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일', nullable: true, minLength: 4, maxLength: 4 } })
  birthYear?: string;

  @GenderValidation()
  @Property({ apiProperty: { type: 'string', description: '성별', nullable: true } })
  gender?: number;

  @Property({ apiProperty: { type: 'string', description: '프로필 사진', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', description: '푸시 토큰', nullable: true } })
  pushToken?: string;

  @Property({ apiProperty: { type: 'string', description: '성인 여부', nullable: true } })
  isAdult?: boolean;

  @Property({ apiProperty: { type: 'string', description: '알림 수신 여부', nullable: true } })
  isAlarmAccepted?: boolean;

  constructor(props?: UpdateUserDTOProps) {
    if (props) {
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birthDay = props.birthDay;
      this.birthYear = props.birthYear;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
      this.pushToken = props.pushToken;
      this.isAdult = props.isAdult;
      this.isAlarmAccepted = props.isAlarmAccepted;
    }
  }
}
