import { ApiProperty } from '@nestjs/swagger';

import { Property } from 'cumuco-nestjs';

import { GENDER, GENDER_VALUE, GenderReqDecorators, GenderValidation } from '../../../utils/validation/gender.validate';

interface Props {
  nickname: string;
  email?: string;
  phoneNumber?: string;
  birthDay?: string;
  birthYear?: string;
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

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } })
  birthDay?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } })
  birthYear?: string;

  @GenderReqDecorators(true)
  gender?: number;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  constructor(props?: Props) {
    if (props) {
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birthDay = props.birthDay;
      this.birthYear = props.birthYear;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
    }
  }
}
