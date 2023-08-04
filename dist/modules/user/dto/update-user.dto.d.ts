export interface UpdateUserDTOProps {
    nickname?: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
    pushToken?: string;
    isAdult?: boolean;
    isAlarmAccepted?: boolean;
}
export declare class UpdateUserDTO {
    nickname?: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
    pushToken?: string;
    isAdult?: boolean;
    isAlarmAccepted?: boolean;
    constructor(props?: UpdateUserDTOProps);
}
