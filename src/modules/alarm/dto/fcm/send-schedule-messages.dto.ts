import { Property } from 'wemacu-nestjs';

import { ScheduleFCMMessageDTO, ScheduleFCMMessageDTOProps } from './schedule-fcm-message.dto';

export interface SendScheduleMessagesDTOProps {
  userIds: string[];
  message: ScheduleFCMMessageDTOProps;
}

export class SendScheduleMessagesDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '유저 아이디' } })
  userIds: string[];

  @Property({ apiProperty: { type: ScheduleFCMMessageDTO, description: '메시지' } })
  message: ScheduleFCMMessageDTO;

  constructor(props?: SendScheduleMessagesDTOProps) {
    if (props) {
      this.userIds = props.userIds;
      this.message = new ScheduleFCMMessageDTO(props.message);
    }
  }
}
