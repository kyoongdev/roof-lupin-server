import { Property } from 'cumuco-nestjs';

import { FCMMessageDTO, type FCMMessageDTOProps } from './fcm-message.dto';
export interface SendMessageDTOProps {
  userId: string;
  message: FCMMessageDTOProps;
}

export class SendMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  userId: string;

  @Property({ apiProperty: { type: FCMMessageDTO, description: 'FCM 메시지' } })
  message: FCMMessageDTO;

  constructor(props?: SendMessageDTOProps) {
    if (props) {
      this.userId = props.userId;
      this.message = new FCMMessageDTO(props.message);
    }
  }
}
