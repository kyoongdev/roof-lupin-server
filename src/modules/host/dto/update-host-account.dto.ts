import { Property } from 'wemacu-nestjs';

import { BankCodeReqDecorator } from '@/utils/validation';

export interface UpdateHostAccountProps {
  ownerName?: string;
  bankCode?: string;
  businessRegistrationNumber?: string;
  account?: string;
  accountOwner?: string;
}

export class UpdateHostAccountDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '사업주 이름' } })
  ownerName?: string;

  @BankCodeReqDecorator(true)
  bankCode?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '사업자등록번호' } })
  businessRegistrationNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '계좌번호' } })
  account?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '계좌 소유자 이름' } })
  accountOwner?: string;

  constructor(props?: UpdateHostAccountProps) {
    if (props) {
      this.ownerName = props.ownerName;
      this.bankCode = props.bankCode;
      this.businessRegistrationNumber = props.businessRegistrationNumber;
      this.account = props.account;
      this.accountOwner = props.accountOwner;
    }
  }
}
