import { Property } from 'cumuco-nestjs';

export class UpdateAdminPasswordDTO {
  @Property({ apiProperty: { type: 'string', description: '새로운 비밀번호' } })
  password: string;

  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  userId: string;
}
