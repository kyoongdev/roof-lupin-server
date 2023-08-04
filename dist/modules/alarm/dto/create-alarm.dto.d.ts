export interface CreateAlarmDTOProps {
    title: string;
    content: string;
    link?: string;
    alarmAt?: Date;
    isPush?: boolean;
    userId?: string;
    spaceId?: string;
    exhibitionId?: string;
}
export declare class CreateAlarmDTO {
    title: string;
    content: string;
    link?: string;
    alarmAt?: Date;
    isPush?: boolean;
    userId?: string;
    spaceId?: string;
    exhibitionId?: string;
    constructor(props?: CreateAlarmDTOProps);
}
