import { Property } from 'wemacu-nestjs';

export interface HomeDTOProps {
  mainImageId: string;
  mainImage: string;
  sloganId: string;
  content: string;
}

export class MainDTO {
  @Property({ apiProperty: { type: 'string', description: '메인화면 배경 이미지 ID' } })
  mainImageId: string;

  @Property({ apiProperty: { type: 'string', description: '메인화면 배경 이미지 url' } })
  mainImage: string;

  @Property({ apiProperty: { type: 'string', description: '메인화면 슬로건 ID' } })
  sloganId: string;

  @Property({ apiProperty: { type: 'string', description: '메인화면 슬로건' } })
  content: string;

  constructor(props: HomeDTOProps) {
    Object.assign(this, props);
  }
}
