import { Property } from 'wemacu-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface AlarmDTOProps {
  id: string;
  title: string;
  content: string;
  link?: string;
  alarmAt?: Date;
  isRead: boolean;
  user: CommonUserProps;
}

export class AlarmDTO {
  @Property({ apiProperty: { type: 'string', description: '알람 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '알람 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '알람 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '알람 링크' } })
  link?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '알람 시간' } })
  alarmAt?: Date;

  @Property({ apiProperty: { type: 'boolean', description: '읽음 여부' } })
  isRead: boolean;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  constructor(props: AlarmDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.link = props.link;
    this.alarmAt = props.alarmAt;
    this.isRead = props.isRead;
    this.user = new CommonUserDTO(props.user);
  }
}
