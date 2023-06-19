import { Body, Get } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreatePaymentDTO } from '../reservation/dto';

import { PaymentService } from './payment.service';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('payments', '결제')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/kakao/prepare')
  @RequestApi({
    summary: {
      summary: '카카오 결제 준비하기 - 성공 시',
      description: '카카오 결제 준비하기',
    },
  })
  @ResponseApi({})
  async prepareKakaoPayment(@ReqUser() user: RequestUser, @Body() data: CreatePaymentDTO) {
    return await this.paymentService.prepareKakaoPayment(user.id, data);
  }
}
