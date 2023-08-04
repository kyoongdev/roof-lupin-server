import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
export interface AlarmDTOProps {
    id: string;
    title: string;
    content: string;
    link?: string;
    alarmAt?: Date;
    isRead: boolean;
    isPush: boolean;
    isPushed: boolean;
    user: CommonUserProps;
}
export declare class AlarmDTO {
    id: string;
    title: string;
    content: string;
    link?: string;
    alarmAt?: Date;
    isRead: boolean;
    isPush: boolean;
    isPushed: boolean;
    user: CommonUserDTO;
    constructor(props: AlarmDTOProps);
}
