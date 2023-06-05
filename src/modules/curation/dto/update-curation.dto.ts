import { Property } from 'wemacu-nestjs';

export interface UpdateCurationDTOProps {
  title?: string;
  subTitle?: string;
  content?: string;
  thumbnail?: string;
}

export class UpdateCurationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 제목' } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 부제목' } })
  subTitle?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 내용' } })
  content?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 썸네일' } })
  thumbnail?: string;

  constructor(props?: UpdateCurationDTOProps) {
    if (props) {
      this.title = props.title;
      this.subTitle = props.subTitle;
      this.content = props.content;
      this.thumbnail = props.thumbnail;
    }
  }
}
