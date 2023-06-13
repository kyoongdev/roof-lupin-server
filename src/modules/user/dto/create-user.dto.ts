import { Property } from 'wemacu-nestjs';

import { GENDER_VALUE, GenderDecorators, GenderValidation } from '../../../utils/validation/gender.validate';

interface Props {
  nickname: string;
  email?: string;
  phoneNumber?: string;
  birth?: string;
  gender?: number;
  profileImage?: string;
}

export class CreateUserDTO {
  @Property({ apiProperty: { type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, maxLength: 11 } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @GenderDecorators()
  @Property({
    apiProperty: { type: 'number', nullable: true, enum: GENDER_VALUE, description: '성별 : MALE | FEMALE' },
  })
  gender?: number;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  constructor(props?: Props) {
    if (props) {
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birth = props.birth;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
    }
  }
}
