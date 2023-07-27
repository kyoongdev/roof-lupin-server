import { Property } from 'cumuco-nestjs';

import { FCMMessageDTO, FCMMessageDTOProps } from './fcm-message.dto';

export interface ScheduleFCMMessageDTOProps extends FCMMessageDTOProps {
  targetDate: Date;
}

export class ScheduleFCMMessageDTO extends FCMMessageDTO {
  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '알람 일시' } })
  targetDate: Date;

  constructor(props?: ScheduleFCMMessageDTOProps) {
    super(props);
    if (props) {
      this.targetDate = props.targetDate;
    }
  }
}
