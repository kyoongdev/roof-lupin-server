interface CreateHostDTOProps {
    name: string;
    email: string;
    profileImage?: string;
    phoneNumber: string;
    gender: number;
    password: string;
}
export declare class CreateHostDTO {
    name: string;
    email: string;
    profileImage?: string;
    phoneNumber: string;
    gender: number;
    password: string;
    constructor(props?: CreateHostDTOProps);
}
export {};
