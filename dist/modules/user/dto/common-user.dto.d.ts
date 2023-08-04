import { User } from '@prisma/client';
import { BaseUserDTO } from './base-user.dto';
export type CommonUserProps = Partial<User>;
export declare class CommonUserDTO extends BaseUserDTO {
    id: string;
    name: string;
    nickname: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
    isAdult: boolean;
    isAlarmAccepted: boolean;
    constructor(props: CommonUserProps);
}
