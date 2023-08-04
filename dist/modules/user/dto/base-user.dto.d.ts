import { DateDTO } from '@/common';
import type { UserGender } from '@/interface/user.interface';
export declare class BaseUserDTO extends DateDTO {
    userGenderConverter(gender?: number): UserGender | undefined;
}
