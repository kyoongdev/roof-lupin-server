import { Validate } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { DayValidation } from '@/utils';

import { GenderReqDecorators, GenderValidation } from '../../../utils/validation/gender.validate';

export interface UpdateUserDTOProps {
  nickname?: string;
  email?: string;
  name?: string;
  gender?: number;
  profileImage?: string;
  pushToken?: string;
}

export class UpdateUserDTO {
  @Property({ apiProperty: { type: 'string', description: '이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', description: '닉네임', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', description: '이메일', nullable: true } })
  email?: string;

  @GenderReqDecorators(true)
  gender?: number;

  @Property({ apiProperty: { type: 'string', description: '프로필 사진', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', description: '푸시 토큰', nullable: true } })
  pushToken?: string;

  constructor(props?: UpdateUserDTOProps) {
    if (props) {
      this.nickname = props.nickname;
      this.email = props.email;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
      this.pushToken = props.pushToken;
    }
  }
}
