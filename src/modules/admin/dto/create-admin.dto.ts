import { compare } from 'bcrypt';
import { Property } from 'wemacu-nestjs';

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

  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
}
