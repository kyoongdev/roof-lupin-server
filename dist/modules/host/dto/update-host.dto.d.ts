interface UpdateHostDTOProps {
    name?: string;
    email?: string;
    profileImage?: string;
    phoneNumber?: string;
    gender?: number;
    password?: string;
}
export declare class UpdateHostDTO {
    name?: string;
    email?: string;
    profileImage?: string;
    phoneNumber?: string;
    gender?: number;
    password?: string;
    constructor(props?: UpdateHostDTOProps);
}
export {};
