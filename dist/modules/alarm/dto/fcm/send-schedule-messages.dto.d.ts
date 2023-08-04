import { ScheduleFCMMessageDTO, ScheduleFCMMessageDTOProps } from './schedule-fcm-message.dto';
export interface SendScheduleMessagesDTOProps {
    userIds: string[];
    message: ScheduleFCMMessageDTOProps;
}
export declare class SendScheduleMessagesDTO {
    userIds: string[];
    message: ScheduleFCMMessageDTO;
    constructor(props?: SendScheduleMessagesDTOProps);
}
