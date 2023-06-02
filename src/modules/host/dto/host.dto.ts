import { Property } from 'wemacu-nestjs';

import type { DateProps } from '@/common';

import { BaseHostDTO } from './base-host.dto';

export interface HostDTOProps extends DateProps {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  gender: number;
}

export class HostDTO extends BaseHostDTO {
  @Property({ apiProperty: { type: 'string', description: 'host ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  email: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 프로필 이미지' } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'string', description: '연락처' } })
  phoneNumber: string;

  @Property({ apiProperty: { type: 'string', description: '남성 | 여성' } })
  gender: string;

  constructor(props: HostDTOProps) {
    super();
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.profileImage = props.profileImage;
    this.gender = this.hostGenderConverter(props.gender);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
