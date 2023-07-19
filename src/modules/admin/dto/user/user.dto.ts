import { Property } from 'wemacu-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface AdminUserDTOProps extends CommonUserProps {
  isBlocked: boolean;
  loginedAt?: Date;
}
export class AdminUserDTO extends CommonUserDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부' } })
  isBlocked: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '차단 여부' } })
  loginedAt?: Date;

  constructor(props: AdminUserDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
    this.loginedAt = props.loginedAt;
  }
}
