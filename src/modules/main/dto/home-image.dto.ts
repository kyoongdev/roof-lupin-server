import { MainImage } from '@prisma/client';
import { Property } from 'cumuco-nestjs';
export type MainImageDTOProps = MainImage;

export class MainImageDTO {
  @Property({ apiProperty: { type: 'string', description: '홈 이미지 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이미지 url' } })
  url: string;

  @Property({ apiProperty: { type: 'string', description: '기본 설정 여부' } })
  isDefault: boolean;

  constructor(props: MainImageDTOProps) {
    this.id = props.id;
    this.url = props.url;
    this.isDefault = props.isDefault;
  }
}
