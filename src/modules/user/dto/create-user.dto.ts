import { Property } from 'wemacu-nestjs';

import { EmailNotRegistered } from './validate/gender.validate';

interface Props {
  name?: string;
  nickname: string;
  email?: string;
  phoneNumber?: string;
  birth?: string;
  gender?: number;
  profileImage?: string;
}

export class CreateUserDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, maxLength: 11 } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({
    apiProperty: { type: 'number', nullable: true, example: '1 = 남성, 2 = 여성' },
  })
  @EmailNotRegistered({ message: 'error message 등록이 왜 안될까?', always: true })
  gender?: number;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  constructor(props?: Props) {
    if (props) {
      this.name = props.name;
      this.nickname = props.nickname;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.birth = props.birth;
      this.gender = props.gender;
      this.profileImage = props.profileImage;
    }
  }
}
