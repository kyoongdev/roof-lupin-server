import { Admin } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

type Props = Partial<Admin>;

export class UpdateAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', description: '아이디', nullable: true } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', description: '비밀번호', nullable: true } })
  password?: string;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부', nullable: true } })
  isAccepted?: boolean;

  constructor(props?: Props) {
    if (props) {
      this.name = props.name;
      this.userId = props.userId;
      this.password = props.password;
      this.isAccepted = props.isAccepted;
    }
  }
}
