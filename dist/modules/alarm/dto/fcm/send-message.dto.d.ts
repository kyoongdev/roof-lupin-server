import { FCMMessageDTO, type FCMMessageDTOProps } from './fcm-message.dto';
export interface SendMessageDTOProps {
    userId: string;
    message: FCMMessageDTOProps;
}
export declare class SendMessageDTO {
    userId: string;
    message: FCMMessageDTO;
    constructor(props?: SendMessageDTOProps);
}
