import { Property } from 'wemacu-nestjs';

import { SendFCMMessageDTO, SendFCMMessageDTOProps } from './send-fcm-message.dto';

export interface SendScheduleFCMMessageDTOProps extends SendFCMMessageDTOProps {
  targetDate: Date;
}

export class SendScheduleFCMMessageDTO extends SendFCMMessageDTO {
  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '알람 일시' } })
  targetDate: Date;

  constructor(props?: SendScheduleFCMMessageDTOProps) {
    super(props);
    if (props) {
      this.targetDate = props.targetDate;
    }
  }
}
