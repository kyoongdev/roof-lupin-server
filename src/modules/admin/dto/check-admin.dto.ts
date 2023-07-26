import { Property } from 'cumuco-nestjs';

export class CheckAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 아이디' } })
  userId: string;
}
