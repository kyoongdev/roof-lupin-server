import { SocialType } from '@/interface/user.interface';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
export interface AdminUserDTOProps extends CommonUserProps {
    isBlocked: boolean;
    unBlockAt?: Date;
    loginedAt?: Date;
    socialType?: SocialType;
    pushToken?: string;
}
export declare class AdminUserDTO extends CommonUserDTO {
    isBlocked: boolean;
    unBlockAT?: Date;
    loginedAt?: Date;
    socialType?: string;
    pushToken?: string;
    constructor(props: AdminUserDTOProps);
}
