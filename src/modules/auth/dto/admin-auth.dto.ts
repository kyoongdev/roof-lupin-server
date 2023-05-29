import { compare } from 'bcrypt';
import { Property } from 'wemacu-nestjs';

export class AdminAuthDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  userId: string;

  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  password: string;

  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
}
