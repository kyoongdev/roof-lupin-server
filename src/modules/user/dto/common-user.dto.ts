import { User } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { BaseUserDTO } from './base-user.dto';

export type CommonUserProps = Partial<User>;

export class CommonUserDTO extends BaseUserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  birth?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, example: '남성 | 여성 | undefined' } })
  gender?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  constructor(props: CommonUserProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.nickname = props.nickname;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.birth = props.birth;
    this.gender = this.userGenderConverter(props.gender);
    this.profileImage = props.profileImage;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
