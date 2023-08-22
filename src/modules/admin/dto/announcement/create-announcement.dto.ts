import { Property } from 'cumuco-nestjs';

export interface CreateAnnouncementDTOProps {
  title: string;
  content: string;
}

export class CreateAnnouncementDTO {
  @Property({ apiProperty: { type: 'string', description: '공지사항 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '공지사항 내용' } })
  content: string;

  constructor(props?: CreateAnnouncementDTOProps) {
    if (props) {
      Object.assign(this, props);
    }
  }
}
