import { Property } from 'wemacu-nestjs';

import { BankCodeResDecorator } from '@/utils/validation';

export interface CreateHostAccountProps {
  ownerName: string;
  bankName: string;
  businessRegistrationNumber: string;
  account: string;
  accountOwner: string;
}

export class CreateHostAccountDTO {
  @Property({ apiProperty: { type: 'string', description: '사업주 이름' } })
  ownerName: string;

  @BankCodeResDecorator()
  bankName: string;

  @Property({ apiProperty: { type: 'string', description: '사업자등록번호' } })
  businessRegistrationNumber: string;

  @Property({ apiProperty: { type: 'string', description: '계좌번호' } })
  account: string;

  @Property({ apiProperty: { type: 'string', description: '계좌 소유자 이름' } })
  accountOwner: string;

  constructor(props?: CreateHostAccountProps) {
    if (props) {
      this.ownerName = props.ownerName;
      this.bankName = props.bankName;
      this.businessRegistrationNumber = props.businessRegistrationNumber;
      this.account = props.account;
      this.accountOwner = props.accountOwner;
    }
  }
}
