import { Property } from 'wemacu-nestjs';

export interface CreateAlarmDTOProps {
  title: string;
  content: string;
  link?: string;
  alarmAt?: Date;
  isRead?: boolean;
  isPush?: boolean;
  isPushed?: boolean;
  userId?: string;
}

export class CreateAlarmDTO {
  @Property({ apiProperty: { type: 'string', description: '알람 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '알람 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '알람 링크' } })
  link?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '알람 시간' } })
  alarmAt?: Date;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '읽음 여부' } })
  isRead?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '푸시 여부' } })
  isPush?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '푸시 전송 여부' } })
  isPushed?: boolean;

  @Property({ apiProperty: { type: 'string', description: '유저 id' } })
  userId: string;

  constructor(props?: CreateAlarmDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
      this.link = props.link;
      this.alarmAt = props.alarmAt;
      this.isRead = props.isRead;
      this.isPush = props.isPush;
      this.isPushed = props.isPushed;
      this.userId = props.userId;
    }
  }
}
