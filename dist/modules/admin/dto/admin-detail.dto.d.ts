import { Admin } from '@prisma/client';
import { AdminDTO } from './admin.dto';
type Props = Partial<Admin>;
export declare class AdminDetailDTO extends AdminDTO {
    password: string;
    salt: string;
    constructor(props: Props);
}
export {};
