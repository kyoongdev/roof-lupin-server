import { Slogan } from '@prisma/client';
import { Property } from 'wemacu-nestjs';
export type SloganDTOProps = Slogan;

export class SloganDTO {
  @Property({ apiProperty: { type: 'string', description: '슬로건 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '텍스트' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '기본 설정 여부' } })
  isDefault: boolean;

  constructor(props: SloganDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.isDefault = props.isDefault;
  }
}
