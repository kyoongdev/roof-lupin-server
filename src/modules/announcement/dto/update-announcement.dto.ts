import { Property } from 'wemacu-nestjs';

export interface UpdateAnnouncementDTOProps {
  title?: string;
  content?: string;
}

export class UpdateAnnouncementDTO {
  @Property({ apiProperty: { type: 'string', description: '공지사항 제목', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', description: '공지사항 내용', nullable: true } })
  content?: string;

  constructor(props?: UpdateAnnouncementDTOProps) {
    if (props) {
      Object.assign(this, props);
    }
  }
}
