import { Property } from 'cumuco-nestjs';

export class CreateIconDTO {
  @Property({ apiProperty: { type: 'string', description: '아이콘 이름' } })
  name: string;
}
