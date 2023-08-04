import type { DateProps } from '@/common';
import { BaseHostDTO } from './base-host.dto';
export interface HostDTOProps extends DateProps {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    gender: number;
    phoneNumber: string;
}
export declare class HostDTO extends BaseHostDTO {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    phoneNumber: string;
    gender: string;
    constructor(props: HostDTOProps);
}
