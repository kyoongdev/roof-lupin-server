import { Property } from 'cumuco-nestjs';

import { DateDTO, type DateDTOProps } from '@/common';

export interface HostDTOProps extends DateDTOProps {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  phoneNumber: string;
  isBlocked: boolean;
  unBlockAt?: Date;
}

export class HostDTO extends DateDTO {
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

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '차단 여부' } })
  isBlocked: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, format: 'date-time', description: '차단 해제일' } })
  unBlockAt?: Date;

  constructor(props: HostDTOProps) {
    super();
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.profileImage = props.profileImage;
    this.phoneNumber = props.phoneNumber;
    this.isBlocked = props.isBlocked;
    this.unBlockAt = props.unBlockAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
