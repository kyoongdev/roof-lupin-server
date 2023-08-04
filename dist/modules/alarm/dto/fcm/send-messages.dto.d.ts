import { FCMMessageDTO, type FCMMessageDTOProps } from './fcm-message.dto';
export interface SendMessagesDTOProps {
    userIds: string[];
    message: FCMMessageDTOProps;
}
export declare class SendMessagesDTO {
    userIds: string[];
    message: FCMMessageDTO;
    constructor(props?: SendMessagesDTOProps);
}
