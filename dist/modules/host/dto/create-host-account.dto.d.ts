export interface CreateHostAccountProps {
    ownerName: string;
    bankCode: string;
    businessRegistrationNumber?: string;
    account: string;
    accountOwner: string;
    accountType: number;
}
export declare class CreateHostAccountDTO {
    accountType: number;
    ownerName: string;
    bankCode: string;
    businessRegistrationNumber?: string;
    account: string;
    accountOwner: string;
    constructor(props?: CreateHostAccountProps);
}
