import { Property } from 'wemacu-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface AdminUserDTOProps extends CommonUserProps {
  isBlocked: boolean;
}
export class AdminUserDTO extends CommonUserDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부' } })
  isBlocked: boolean;

  constructor(props: AdminUserDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
  }
}
