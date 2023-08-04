import { Admin } from '@prisma/client';
import { DateDTO } from '@/common';
export type AdminDTOProps = Partial<Admin>;
export declare class AdminDTO extends DateDTO {
    id: string;
    name: string;
    userId: string;
    isAccepted: boolean;
    constructor(props: AdminDTOProps);
}
