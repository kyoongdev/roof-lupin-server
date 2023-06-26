import { Property } from 'wemacu-nestjs';

import { GenderValidation } from '../../../utils/validation/gender.validate';

interface Props {
  nickname?: string;
  email?: string;
  phoneNumber?: string;
  birth?: string;
  gender?: number;
  profileImage?: string;
  pushToken?: string;
}

export class UpdateUserDTO {
  @Property({ apiProperty: { type: 'string', description: '닉네임', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', description: '이메일', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', description: '연락처', nullable: true } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일', nullable: true, minLength: 8, maxLength: 8 } })
  birth?: string;

  @GenderValidation()
  @Property({ apiProperty: { type: 'string', description: '성별', nullable: true } })
  gender?: number;

  @Property({ apiProperty: { type: 'string', description: '프로필 사진', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', description: '푸시 토큰', nullable: true } })
  pushToken?: string;

  constructor(props?: Props) {
    if (props) {
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birth = props.birth;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
      this.pushToken = props.pushToken;
    }
  }
}
