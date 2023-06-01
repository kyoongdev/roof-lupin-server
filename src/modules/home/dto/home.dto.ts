import { Property } from 'wemacu-nestjs';

export interface HomeDTOProps {
  homeImageId: string;
  homeImage: string;
  sloganId: string;
  content: string;
}

export class HomeDTO {
  @Property({ apiProperty: { type: 'string', description: '메인화면 배경 이미지 ID' } })
  homeImageId: string;

  @Property({ apiProperty: { type: 'string', description: '메인화면 배경 이미지 url' } })
  homeImage: string;

  @Property({ apiProperty: { type: 'string', description: '메인화면 슬로건 ID' } })
  sloganId: string;

  @Property({ apiProperty: { type: 'string', description: '메인화면 슬로건' } })
  content: string;

  constructor(props: HomeDTOProps) {
    Object.assign(this, props);
  }
}
