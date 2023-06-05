import { Property } from 'wemacu-nestjs';

export interface CurationDTOProps {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CurationDTO {
  @Property({ apiProperty: { type: 'string', description: '큐레이션 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 부제목' } })
  subTitle: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '큐레이션 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '큐레이션 수정일' } })
  updatedAt: Date;

  constructor(props: CurationDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.subTitle = props.subTitle;
    this.content = props.content;
    this.thumbnail = props.thumbnail;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
