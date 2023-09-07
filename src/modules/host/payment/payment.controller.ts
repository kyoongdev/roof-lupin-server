import { Get, Query } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { BANK_CODE } from '@/common/constants';
import { BankCodeDTO, ValidateAccountQuery, ValidatedAccountDTO } from '@/modules/payment/dto';
import { ApiController } from '@/utils';

import { HostPaymentService } from './payment.service';

@ApiController('payments', '[호스트] 결제')
export class HostPaymentController {
  constructor(private readonly paymentService: HostPaymentService) {}

  @Get('/accounts/validate')
  @RequestApi({
    summary: {
      summary: '계좌 유효성 검사하기 ',
      description: '계좌 유효성 검사하기',
    },
  })
  @ResponseApi({
    type: ValidatedAccountDTO,
  })
  async validateAccount(@Query() query: ValidateAccountQuery) {
    return await this.paymentService.validateAccount(query);
  }

  @Get('/bank-code')
  @RequestApi({
    summary: {
      summary: '은행 코드 조회하기 ',
      description: '은행 코드 조회하기',
    },
  })
  @ResponseApi({
    type: BankCodeDTO,
    isArray: true,
  })
  async getBankCode() {
    return Object.entries(BANK_CODE).map(([key, value]) => {
      return new BankCodeDTO({
        code: key,
        name: value,
      });
    });
  }
}
