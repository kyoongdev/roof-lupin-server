import { Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { KakaoPayProvider } from '@/common/payment';
import { ApiController } from '@/utils';

@ApiController('payments', '결제')
export class PaymentController {
  constructor(private readonly kakaoPayment: KakaoPayProvider) {}

  @Get('/kakao/pre')
  @RequestApi({
    summary: {
      summary: '카카오 결제 승인',
      description: '카카오 결제 승인',
    },
  })
  @ResponseApi({})
  async kakaoPayTest() {
    const result = await this.kakaoPayment.preparePayment({
      quantity: 1,
      total_amount: 1000,
      tax_free_amount: 900,
      vat_amount: 100,
      item_name: '테스트 상품',
    });
    console.log(result);
    return result;
  }
}
