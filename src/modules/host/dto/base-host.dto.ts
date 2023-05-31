import { DateDTO } from '@/common';
import type { UserGender } from '@/interface/user.interface';

export class BaseHostDTO extends DateDTO {
  //INFO: 1 = 남성, 2 = 여성
  public hostGenderConverter(gender?: number): UserGender | undefined {
    if (gender === 1) {
      return '남성';
    } else if (gender === 2) {
      return '여성';
    }
    return undefined;
  }
}
