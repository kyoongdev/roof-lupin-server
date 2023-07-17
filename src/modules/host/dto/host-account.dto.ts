import { Property } from 'wemacu-nestjs';

import { BankCodeReqDecorator } from '@/utils/validation';

export interface HostAccountDTOProps {
  id: string;
  ownerName: string;
  bankCode: string;
  businessRegistrationNumber: string;
  account: string;
  accountOwner: string;
}

export class HostAccountDTO {
  @Property({ apiProperty: { type: 'string', description: '공간주 사업자 및 계좌 정보 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '사업주 이름' } })
  ownerName: string;

  @BankCodeReqDecorator()
  bankCode: string;

  @Property({ apiProperty: { type: 'string', description: '사업자등록번호' } })
  businessRegistrationNumber: string;

  @Property({ apiProperty: { type: 'string', description: '계좌번호' } })
  account: string;

  @Property({ apiProperty: { type: 'string', description: '계좌 소유자 이름' } })
  accountOwner: string;

  constructor(props: HostAccountDTOProps) {
    this.id = props.id;
    this.ownerName = props.ownerName;
    this.bankCode = props.bankCode;
    this.businessRegistrationNumber = props.businessRegistrationNumber;
    this.account = props.account;
    this.accountOwner = props.accountOwner;
  }
}
