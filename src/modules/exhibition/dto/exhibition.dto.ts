import { Property } from 'wemacu-nestjs';

export interface ExhibitionDTOProps {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
}

export class ExhibitionDTO {
  @Property({ apiProperty: { type: 'string', description: '기획전 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 부가설명' } })
  description: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 시작' } })
  startAt: Date;

  @Property({ apiProperty: { type: 'string', description: '기획전 끝' } })
  endAt: Date;

  @Property({ apiProperty: { type: 'string', description: '기획전 생성일' } })
  createdAt: Date;

  constructor(props: ExhibitionDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
    this.description = props.description;
    this.content = props.content;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.createdAt = props.createdAt;
  }
}
