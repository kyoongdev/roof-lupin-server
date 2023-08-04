export interface UpdateHostAccountProps {
    ownerName?: string;
    bankCode?: string;
    businessRegistrationNumber?: string;
    account?: string;
    accountOwner?: string;
}
export declare class UpdateHostAccountDTO {
    ownerName?: string;
    bankCode?: string;
    businessRegistrationNumber?: string;
    account?: string;
    accountOwner?: string;
    constructor(props?: UpdateHostAccountProps);
}
