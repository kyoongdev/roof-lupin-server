interface Props {
    name: string;
    userId: string;
    password: string;
}
export declare class CreateAdminDTO {
    userId: string;
    password: string;
    name: string;
    constructor(props?: Props);
}
export {};
