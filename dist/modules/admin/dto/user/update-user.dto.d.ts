import { UpdateUserDTO, UpdateUserDTOProps } from '@/modules/user/dto';
export interface AdminUpdateUserDTOProps extends UpdateUserDTOProps {
    isBlocked?: boolean;
    unBlockAt?: Date;
}
export declare class AdminUpdateUserDTO extends UpdateUserDTO {
    isBlocked?: boolean;
    unBlockAt?: Date;
    constructor(props: AdminUpdateUserDTOProps);
}
