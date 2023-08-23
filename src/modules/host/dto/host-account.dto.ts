import { Property } from 'cumuco-nestjs';

import { BANK_CODES } from '@/utils/validation/bank.validation';

export interface HostAccountDTOProps {
  id: string;

  bankCode: string;
  businessRegistrationNumber?: string;
  businessRegistrationFile?: string;
  businessName?: string;
  account: string;
  accountOwner: string;
}

export class HostAccountDTO {
  @Property({ apiProperty: { type: 'string', description: '공간주 사업자 및 계좌 정보 id' } })
  id: string;

  @Property({ apiProperty: { description: '은행 코드', type: 'string', example: BANK_CODES.join(' | ') } })
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

  constructor(props: HostAccountDTOProps) {
    this.id = props.id;
    this.bankCode = props.bankCode;
    this.businessRegistrationFile = props.businessRegistrationFile;
    this.businessRegistrationNumber = props.businessRegistrationNumber;
    this.businessName = props.businessName;
    this.account = props.account;
    this.accountOwner = props.accountOwner;
  }
}
