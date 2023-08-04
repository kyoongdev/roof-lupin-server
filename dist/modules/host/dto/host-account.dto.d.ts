export interface HostAccountDTOProps {
    id: string;
    ownerName: string;
    bankCode: string;
    businessRegistrationNumber: string;
    account: string;
    accountOwner: string;
}
export declare class HostAccountDTO {
    id: string;
    ownerName: string;
    bankCode: string;
    businessRegistrationNumber: string;
    account: string;
    accountOwner: string;
    constructor(props: HostAccountDTOProps);
}
