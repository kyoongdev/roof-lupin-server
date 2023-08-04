import { Admin } from '@prisma/client';
type Props = Partial<Admin>;
export declare class UpdateAdminDTO {
    name?: string;
    userId?: string;
    password?: string;
    isAccepted?: boolean;
    constructor(props?: Props);
}
export {};
