import { User, UserSocial } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { GENDER_VALUE, GenderResTransForm } from '@/utils/validation';

import { numberToSocialType } from '../utils';

import { BaseUserDTO } from './base-user.dto';
import { UserSettingDTO, UserSettingDTOProps } from './setting';

export interface CommonUserProps extends Partial<User> {
  socials: UserSocial[];
  setting: UserSettingDTOProps;
}

export class CommonUserDTO extends BaseUserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '-을 제외한 11자리 입니다.' } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } })
  birthDay?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } })
  birthYear?: string;

  @GenderResTransForm()
  @Property({ apiProperty: { type: 'string', nullable: true, example: GENDER_VALUE.join(',') + ',NULL' } })
  gender?: number;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'boolean', description: '성인 인증 여부' } })
  isAdult: boolean;

  @Property({ apiProperty: { type: 'string', description: '유저 소셜 타입', example: 'KAKAO | NAVER | APPLE' } })
  socialType: string;

  @Property({ apiProperty: { type: UserSettingDTO, description: '설정' } })
  setting: UserSettingDTO;

  constructor(props: CommonUserProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.nickname = props.nickname;
    this.email = props.email ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
    this.birthYear = props.birthYear ?? null;
    this.birthDay = props.birthDay ?? null;
    this.gender = props.gender;
    this.profileImage = props.profileImage ?? null;
    this.isAdult = props.isAdult;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.socialType = props.socials.length > 0 ? numberToSocialType(props.socials.at(-1).socialType) : null;
    this.setting = new UserSettingDTO(props.setting);
  }
}
