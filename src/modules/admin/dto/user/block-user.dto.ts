import { Property } from 'cumuco-nestjs';

export class BlockUserDTO {
  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '차단 해제일' } })
  unBlockAt: Date;
}
