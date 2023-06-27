import { Property } from 'wemacu-nestjs';

import { ScheduleFCMMessageDTO, ScheduleFCMMessageDTOProps } from './schedule-fcm-message.dto';

export interface SendScheduleMessageDTOProps {
  userId: string;
  message: ScheduleFCMMessageDTOProps;
}

export class SendScheduleMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  userId: string;

  @Property({ apiProperty: { type: ScheduleFCMMessageDTO, description: '메시지' } })
  message: ScheduleFCMMessageDTO;

  constructor(props?: SendScheduleMessageDTOProps) {
    if (props) {
      this.userId = props.userId;
      this.message = new ScheduleFCMMessageDTO(props.message);
    }
  }
}
