import { Property } from 'wemacu-nestjs';

export interface BestPhotoDTOProps {
  id: string;
  url: string;
}

export class BestPhotoDTO {
  @Property({ apiProperty: { type: 'string', description: '베스트 포토 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이미지 주소' } })
  url: string;

  constructor(props: BestPhotoDTOProps) {
    this.id = props.id;
    this.url = props.url;
  }
}
