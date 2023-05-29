import { getEnumValues, Property } from 'wemacu-nestjs';

import { SOCIAL_TYPE, type SocialType } from '@/interface/user.interface';

import { socialTypeToNumber } from '../utils';

interface Props {
  name?: string;
  nickname: string;
  email?: string;
  phoneNumber?: string;
  birth?: string;
  gender?: number;
  profileImage?: string;
  socialId: string;
  socialType: SocialType;
}

export class CreateSocialUserDTO {
  @Property({ apiProperty: { type: 'string', description: '이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', description: '닉네임' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', description: '이메일', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', description: '연락처', nullable: true } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'number', description: '성별', nullable: true } })
  gender?: number;

  @Property({ apiProperty: { type: 'string', description: '프로필 사진', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', description: '소셜 ID' } })
  socialId: string;

  @Property({ apiProperty: { type: 'number', description: '1 = 카카오, 2 = 네이버 , 3 = 애플' } })
  socialType: number;

  constructor(props?: Props) {
    if (props) {
      this.name = props.name;
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birth = props.birth;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
      this.socialId = props.socialId;
      this.socialType = socialTypeToNumber(props.socialType);
    }
  }
}
