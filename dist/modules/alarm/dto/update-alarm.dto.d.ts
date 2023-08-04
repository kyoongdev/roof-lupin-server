export interface UpdateAlarmDTOProps {
    title?: string;
    content?: string;
    link?: string;
    alarmAt?: Date;
    isRead?: boolean;
    isPush?: boolean;
    isPushed?: boolean;
}
export declare class UpdateAlarmDTO {
    title?: string;
    content?: string;
    link?: string;
    alarmAt?: Date;
    isRead?: boolean;
    isPush?: boolean;
    isPushed?: boolean;
    constructor(props?: UpdateAlarmDTOProps);
}
