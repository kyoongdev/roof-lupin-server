import { Property } from 'cumuco-nestjs';

import { DateDTO, type DateProps } from '@/common';

interface AnnouncementDTOProps extends DateProps {
  id: string;
  title: string;
  content: string;
}

export class AnnouncementDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: '공지사항 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공지사항 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '공지사항 내용' } })
  content: string;

  constructor(props: AnnouncementDTOProps) {
    super();
    Object.assign(this, props);
  }
}
