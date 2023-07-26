import { Admin } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { DateDTO } from '@/common';

export type AdminDTOProps = Partial<Admin>;

export class AdminDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  userId: string;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isAccepted: boolean;

  constructor(props: AdminDTOProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.userId = props.userId;
    this.isAccepted = props.isAccepted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
