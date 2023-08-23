import { Property } from 'cumuco-nestjs';

import { BankCodeReqDecorator } from '@/utils/validation/bank.validation';

export interface CreateHostAccountProps {
  ownerName: string;
  bankCode: string;
  businessRegistrationNumber?: string;
  businessRegistrationFile?: string;
  businessName?: string;
  account: string;
  accountOwner: string;
  accountType: number;
}

export class CreateHostAccountDTO {
  @Property({ apiProperty: { type: 'number', description: '사업자 유형' } })
  accountType: number;

  @Property({ apiProperty: { type: 'string', description: '사업주 이름' } })
  ownerName: string;

  @BankCodeReqDecorator()
  bankCode: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '사업자등록번호' } })
  businessRegistrationNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '사업자등록증 파일' } })
  businessRegistrationFile?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '상호명' } })
  businessName?: string;

  @Property({ apiProperty: { type: 'string', description: '계좌번호' } })
  account: string;

  @Property({ apiProperty: { type: 'string', description: '계좌 소유자 이름' } })
  accountOwner: string;

  constructor(props?: CreateHostAccountProps) {
    if (props) {
      this.ownerName = props.ownerName;
      this.bankCode = props.bankCode;
      this.businessRegistrationNumber = props.businessRegistrationNumber;
      this.businessRegistrationFile = props.businessRegistrationFile;
      this.businessName = props.businessName;
      this.account = props.account;
      this.accountOwner = props.accountOwner;
      this.accountType = props.accountType;
    }
  }
}
