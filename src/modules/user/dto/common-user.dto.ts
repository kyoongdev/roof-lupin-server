import { User, UserSocial } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { BaseUserDTO } from './base-user.dto';
import { UserSettingDTOProps } from './setting';

export interface CommonUserDTOProps extends Partial<User> {
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

  constructor(props: CommonUserDTOProps) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.nickname = props.nickname;
    this.email = props.email ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
