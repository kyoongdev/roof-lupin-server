import { Injectable } from '@nestjs/common';

import { ValidateAccountQuery, ValidatedAccountDTO } from '@/modules/payment/dto';
import { PortOneProvider } from '@/utils';

@Injectable()
export class HostPaymentService {
  constructor(private readonly portOne: PortOneProvider) {}

  async validateAccount(data: ValidateAccountQuery) {
    const isValid = await this.portOne.validateAccount({
      bank_code: data.bankCode,
      bank_num: data.bankNum,
    });

    return new ValidatedAccountDTO({ isValid });
  }
}
