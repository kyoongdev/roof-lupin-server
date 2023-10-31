import { Property } from 'cumuco-nestjs';

export interface CertifyUserDTOProps {
  phoneNumber: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}

export class CertifyUserDTO {
  @Property({ apiProperty: { type: 'string', description: '휴대폰 번호' } })
  phoneNumber: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일' } })
  birthYear: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일' } })
  birthMonth: string;

  @Property({ apiProperty: { type: 'string', description: '생년월일' } })
  birthDay: string;

  @Property({ apiProperty: { type: 'boolean', description: '성인 여부' } })
  isAdult: boolean;

  constructor(props?: CertifyUserDTOProps) {
    if (props) {
      this.phoneNumber = props.phoneNumber;
      this.name = props.name;
      this.birthYear = props.birthYear;
      this.birthMonth = props.birthMonth;
      this.birthDay = props.birthDay;
      this.isAdult = this.checkIsAdult();
      console.log(this.isAdult);
    }
  }

  checkIsAdult(): boolean {
    const MIN_AGE = 19; // 만 19세 이상인 경우 성인으로 판별
    const date = new Date();
    const yearDiff = date.getFullYear() - Number(this.birthYear);
    const monthDiff = date.getMonth() + 1 - Number(this.birthMonth);
    const dayDiff = date.getDate() - Number(this.birthDay);
    if (yearDiff > 1000) {
      return false;
    }

    if (yearDiff > MIN_AGE) {
      return true;
    } else if (yearDiff === MIN_AGE) {
      if (monthDiff > 0) {
        return true;
      } else if (monthDiff === 0) {
        if (dayDiff >= 0) {
          return true;
        }
      }
    }

    return false;
  }
}
