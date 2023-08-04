import { FCMMessageDTO, FCMMessageDTOProps } from './fcm-message.dto';
export interface ScheduleFCMMessageDTOProps extends FCMMessageDTOProps {
    targetDate: Date;
}
export declare class ScheduleFCMMessageDTO extends FCMMessageDTO {
    targetDate: Date;
    constructor(props?: ScheduleFCMMessageDTOProps);
}
