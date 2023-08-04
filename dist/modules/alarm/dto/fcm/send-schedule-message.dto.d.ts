import { ScheduleFCMMessageDTO, ScheduleFCMMessageDTOProps } from './schedule-fcm-message.dto';
export interface SendScheduleMessageDTOProps {
    userId: string;
    message: ScheduleFCMMessageDTOProps;
}
export declare class SendScheduleMessageDTO {
    userId: string;
    message: ScheduleFCMMessageDTO;
    constructor(props?: SendScheduleMessageDTOProps);
}
