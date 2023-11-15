import { Property } from 'cumuco-nestjs';

import { SocialType } from '@/interface/user.interface';
import { CommonUserDTOProps, MeDTO } from '@/modules/user/dto';

export interface AdminUserDTOProps extends Omit<CommonUserDTOProps, 'socialType'> {
  isBlocked: boolean;
  unBlockAt?: Date;
  loginedAt?: Date;
  socialType?: SocialType;
  pushToken?: string;
}
export class AdminUserDTO extends MeDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부' } })
  isBlocked: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '차단 해제일' } })
  unBlockAT?: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '차단 여부' } })
  loginedAt?: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '푸시 토큰' } })
  pushToken?: string;

  constructor(props: AdminUserDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
    this.unBlockAT = props.unBlockAt;
    this.loginedAt = props.loginedAt;
    this.socialType = props.socialType;
    this.pushToken = props.pushToken;
  }
}
