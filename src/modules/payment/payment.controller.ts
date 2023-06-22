import { Body, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreatePaymentDTO } from '../reservation/dto';

import { ApproveKakaoPaymentDTO, ConfirmTossPaymentDTO } from './dto';
import { PaymentService } from './payment.service';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('payments', '결제')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/kakao/prepare')
  @RequestApi({
    summary: {
      summary: '카카오 결제 준비하기 ',
      description: '카카오 결제 준비하기',
    },
  })
  @ResponseApi({})
  async prepareKakaoPayment(@ReqUser() user: RequestUser, @Body() data: CreatePaymentDTO) {
    return await this.paymentService.prepareKakaoPayment(user.id, data);
  }

  @Post('/kakao/complete')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      summary: '카카오 결제 완료하기 ',
      description: '카카오 결제 완료하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async completeKakaoPayment(@Body() data: ApproveKakaoPaymentDTO) {
    return await this.paymentService.approveKakaoPayment(data);
  }

  @Post('/toss/prepare')
  @RequestApi({
    summary: {
      summary: '토스 결제 준비하기 ',
      description: '토스 결제 준비하기',
    },
  })
  @ResponseApi({})
  async prepareTossPayment(@ReqUser() user: RequestUser, @Body() data: CreatePaymentDTO) {
    return await this.paymentService.createTossPayment(user.id, data);
  }

  @Post('/toss/complete')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      summary: '토스 결제 완료하기 ',
      description: '토스 결제 완료하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async completeTossPayment(@Body() data: ConfirmTossPaymentDTO) {
    return await this.paymentService.confirmTossPayment(data);
  }
}
