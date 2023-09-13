import { Property } from 'cumuco-nestjs';

import { BANK_CODE } from '@/common/constants';
import { BankCodeReqDecorator } from '@/utils/validation/bank.validation';

export class ValidateAccountQuery {
  @BankCodeReqDecorator()
  bankCode: keyof typeof BANK_CODE;

  @Property({ apiProperty: { type: 'string', description: '계좌번호' } })
  bankNum: string;

  @Property({ apiProperty: { type: 'string', description: '예금주명' } })
  bankHolder: string;
}
