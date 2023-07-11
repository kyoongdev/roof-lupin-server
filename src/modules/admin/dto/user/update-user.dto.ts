import { Property } from 'wemacu-nestjs';

import { UpdateUserDTO, UpdateUserDTOProps } from '@/modules/user/dto';

export interface AdminUpdateUserDTOProps extends UpdateUserDTOProps {
  isBlocked?: boolean;
}

export class AdminUpdateUserDTO extends UpdateUserDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부', nullable: true } })
  isBlocked?: boolean;

  constructor(props: AdminUpdateUserDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
  }
}
