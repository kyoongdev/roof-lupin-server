import { Property } from 'wemacu-nestjs';

import { SOCIAL_TYPE, SocialType } from '@/interface/user.interface';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface AdminUserDTOProps extends CommonUserProps {
  isBlocked: boolean;
  loginedAt?: Date;
  socialType?: SocialType;
}
export class AdminUserDTO extends CommonUserDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부' } })
  isBlocked: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '차단 여부' } })
  loginedAt?: Date;

  @Property({ apiProperty: { type: 'string', example: Object.keys(SOCIAL_TYPE).join(','), description: '소셜 종류' } })
  socialType?: string;

  constructor(props: AdminUserDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
    this.loginedAt = props.loginedAt;
    this.socialType = props.socialType;
  }
}
