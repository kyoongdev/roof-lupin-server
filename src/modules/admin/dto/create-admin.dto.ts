import { Property } from 'cumuco-nestjs';

interface Props {
  name: string;
  userId: string;
  password: string;
}

export class CreateAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  userId: string;

  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  password: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: Props) {
    if (props) {
      this.userId = props.userId;
      this.password = props.password;
      this.name = props.name;
    }
  }
}
