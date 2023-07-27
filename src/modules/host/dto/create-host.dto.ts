import { Property } from 'cumuco-nestjs';

import { GenderReqDecorators, PhoneNumberValidation } from '@/utils/validation';

interface CreateHostDTOProps {
  name: string;
  email: string;
  profileImage?: string;
  phoneNumber: string;
  gender: number;
  password: string;
}

export class CreateHostDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '이메일' } })
  email: string;

  @Property({ apiProperty: { type: 'string', description: '프로필 이미지', nullable: true } })
  profileImage?: string;

  @PhoneNumberValidation()
  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  phoneNumber: string;

  @GenderReqDecorators()
  gender: number;

  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  password: string;

  constructor(props?: CreateHostDTOProps) {
    if (props) {
      Object.assign(this, props);
    }
  }
}
