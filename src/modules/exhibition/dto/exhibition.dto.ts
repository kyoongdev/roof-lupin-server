import { Property } from 'cumuco-nestjs';

export interface ExhibitionDTOProps {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  spaceTitle: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  isShow?: boolean;
  deletedAt?: Date;
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

  @Property({ apiProperty: { type: 'string', description: '기획전 공간 제목' } })
  spaceTitle: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 시작' } })
  startAt: Date;

  @Property({ apiProperty: { type: 'string', description: '기획전 끝' } })
  endAt: Date;

  @Property({ apiProperty: { type: 'string', description: '기획전 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'boolean', description: '노출 여부' } })
  isShow: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '기획전 삭제일' } })
  deletedAt?: Date;

  constructor(props: ExhibitionDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
    this.description = props.description;
    this.content = props.content;
    this.spaceTitle = props.spaceTitle;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.createdAt = props.createdAt;
    this.isShow = props.isShow;
    this.deletedAt = props.deletedAt;
  }
}
