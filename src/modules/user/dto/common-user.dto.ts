import { User } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { BaseUserDTO } from './base-user.dto';

export type CommonUserProps = Partial<User>;

export class CommonUserDTO extends BaseUserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '-을 제외한 11자리 입니다.' } })
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
    this.nickname = props.nickname;
    this.email = props.email ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
    this.birth = props.birth ?? null;
    this.gender = this.userGenderConverter(props.gender);
    this.profileImage = props.profileImage ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
