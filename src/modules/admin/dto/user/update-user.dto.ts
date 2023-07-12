import { Property } from 'wemacu-nestjs';

import { UpdateUserDTO, UpdateUserDTOProps } from '@/modules/user/dto';

export interface AdminUpdateUserDTOProps extends UpdateUserDTOProps {
  isBlocked?: boolean;
  unBlockAt?: Date;
}

export class AdminUpdateUserDTO extends UpdateUserDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부', nullable: true } })
  isBlocked?: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '차단 해제일', nullable: true } })
  unBlockAt?: Date;

  constructor(props: AdminUpdateUserDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
    this.unBlockAt = props.unBlockAt;
  }
}
