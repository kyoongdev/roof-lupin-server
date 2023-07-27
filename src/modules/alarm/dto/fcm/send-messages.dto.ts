import { Property } from 'cumuco-nestjs';

import { FCMMessageDTO, type FCMMessageDTOProps } from './fcm-message.dto';
export interface SendMessagesDTOProps {
  userIds: string[];
  message: FCMMessageDTOProps;
}

export class SendMessagesDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '유저 아이디' } })
  userIds: string[];

  @Property({ apiProperty: { type: FCMMessageDTO, description: 'FCM 메시지' } })
  message: FCMMessageDTO;

  constructor(props?: SendMessagesDTOProps) {
    if (props) {
      this.userIds = props.userIds;
      this.message = new FCMMessageDTO(props.message);
    }
  }
}
