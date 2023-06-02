import { Property } from 'wemacu-nestjs';

import { GenderValidation, PhoneNumberValidation } from '@/utils/validation';

interface UpdateHostDTOProps {
  name?: string;
  email?: string;
  profileImage?: string;
  phoneNumber?: string;
  gender?: number;
  password?: string;
}

export class UpdateHostDTO {
  @Property({ apiProperty: { type: 'string', description: '이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', description: '이메일', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', description: '프로필 이미지', nullable: true } })
  profileImage?: string;

  @PhoneNumberValidation()
  @Property({ apiProperty: { type: 'string', description: '유저 아이디', nullable: true } })
  phoneNumber?: string;

  @GenderValidation()
  @Property({ apiProperty: { type: 'number', description: '성별 1 = 남자, 2 = 여성', nullable: true } })
  gender?: number;

  @Property({ apiProperty: { type: 'string', description: '비밀번호', nullable: true } })
  password?: string;

  constructor(props?: UpdateHostDTOProps) {
    if (props) {
      Object.assign(this, props);
    }
  }
}