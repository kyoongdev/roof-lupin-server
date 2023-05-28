import { DateDTO } from '@/common';

export class BaseUserDTO extends DateDTO {
  //INFO: 1 = 남성, 2 = 여성
  public userGenderConverter(gender?: number) {
    if (gender === 1) {
      return '남성';
    } else if (gender === 2) {
      return '여성';
    }
    return undefined;
  }
}
