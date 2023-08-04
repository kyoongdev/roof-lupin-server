interface Props {
    nickname: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
}
export declare class CreateUserDTO {
    nickname: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
    constructor(props?: Props);
}
export {};
