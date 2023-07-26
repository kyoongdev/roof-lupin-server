import { Property } from 'cumuco-nestjs';

export class HostAuthDTO {
  @Property({ apiProperty: { type: 'string', description: '이메일' } })
  email: string;

  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  password: string;
}
