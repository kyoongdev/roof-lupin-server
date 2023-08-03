import { Property } from 'cumuco-nestjs';

export interface UpdateAlarmDTOProps {
  title?: string;
  content?: string;
  link?: string;
  alarmAt?: Date;
  isRead?: boolean;
  isPush?: boolean;
  isPushed?: boolean;
  userId?: string;
  spaceId?: string;
  exhibitionId?: string;
}

export class UpdateAlarmDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '알람 제목' } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '알람 내용' } })
  content?: string;

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

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 id' } })
  exhibitionId?: string;

  constructor(props?: UpdateAlarmDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
      this.link = props.link;
      this.alarmAt = props.alarmAt;
      this.isRead = props.isRead;
      this.isPush = props.isPush;
      this.isPushed = props.isPushed;
      this.userId = props.userId;
      this.spaceId = props.spaceId;
      this.exhibitionId = props.exhibitionId;
    }
  }
}
