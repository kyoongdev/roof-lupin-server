import { Admin } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { DateDTO } from '@/common';

type Props = Partial<Admin>;

export class AdminDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  userId: string;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isAccepted: boolean;

  constructor(props: Props) {
    super();
    this.name = props.name;
    this.userId = props.userId;
    this.isAccepted = props.isAccepted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
