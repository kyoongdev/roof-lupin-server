import { DateDTO } from '@/common';
import type { UserGender } from '@/interface/user.interface';
export declare class BaseHostDTO extends DateDTO {
    hostGenderConverter(gender?: number): UserGender | undefined;
}
