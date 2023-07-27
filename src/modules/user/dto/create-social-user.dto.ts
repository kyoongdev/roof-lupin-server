import { KakaoGetUser, Property } from 'cumuco-nestjs';

import { type SocialType } from '@/interface/user.interface';

import { socialTypeToNumber } from '../utils';

interface Props {
  name?: string;
  nickname: string;
  email?: string;
  phoneNumber?: string;
  birthDay?: string;
  birthYear?: string;
  gender?: number;
  profileImage?: string;
  socialId: string;
  socialType: SocialType;
}

export class CreateSocialUserDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '닉네임' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', description: '이메일', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', description: '연락처', nullable: true } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', description: '생일 월일', nullable: true, minLength: 4, maxLength: 4 } })
  birthDay?: string;

  @Property({ apiProperty: { type: 'string', description: '생일 연도', nullable: true, minLength: 4, maxLength: 4 } })
  birthYear?: string;

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
      if (props.phoneNumber && props.phoneNumber.includes('-')) props.phoneNumber = props.phoneNumber.replace(/-/g, '');
      this.name = props.name;
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birthDay = props.birthDay;
      this.birthYear = props.birthYear;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
      this.socialId = props.socialId;
      this.socialType = socialTypeToNumber(props.socialType);
    }
  }

  setKakaoUser(socialUser: KakaoGetUser) {
    const account = socialUser.kakaoAccount;
    this.name = socialUser.kakaoAccount.name;
    this.nickname = socialUser.properties.nickname ?? '';
    this.socialId = `${socialUser.id}`;
    this.socialType = socialTypeToNumber('kakao');
    this.birthDay = account.birthday;
    this.birthYear = account.birthyear;
    this.email = account.email;
    this.gender = account.gender ?? account.gender === 'male' ? 1 : account.gender === 'female' ? 2 : undefined;
    this.phoneNumber = account.phone_number;
    this.profileImage = socialUser.properties.profile_image;
    return this;
  }

  getKakaoUser() {
    return this;
  }
}
