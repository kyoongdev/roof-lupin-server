import { Property } from 'wemacu-nestjs';

export class CheckHostDTO {
  @Property({ apiProperty: { type: 'string', description: '이메일' } })
  email: string;

  @Property({ apiProperty: { type: 'string', description: '핸드폰번호' } })
  phoneNumber: string;
}
