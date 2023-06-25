import { Body, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreatePaymentDTO } from '../reservation/dto';

import {
  ApproveKakaoPaymentDTO,
  CompletePortOnePaymentDTO,
  ConfirmTossPaymentDTO,
  CreateTossPaymentDTO,
  PortOnePreparePaymentDTO,
  PrepareKakaoPaymentDTO,
} from './dto';
import { PaymentService } from './payment.service';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('payments', '결제')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/port-one/prepare')
  @RequestApi({
    summary: {
      summary: '포트원 결제 준비하기 ',
      description: '포트원 결제 준비하기',
    },
  })
  @ResponseApi({
    type: PortOnePreparePaymentDTO,
  })
  async preparePortOnePayment(@ReqUser() user: RequestUser, @Body() data: CreatePaymentDTO) {
    return await this.paymentService.preparePortOnePayment(user.id, data);
  }

  @Post('/port-one/complete')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      summary: '포트원 결제 완료하기 ',
      description: '포트원 결제 완료하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async completePortOnePayment(@Body() data: CompletePortOnePaymentDTO) {
    return await this.paymentService.completePortOnePayment(data);
  }

  @Post('/kakao/prepare/test')
  @RequestApi({
    summary: {
      summary: '카카오 결제 준비 테스트하기 ',
      description: '카카오 결제 준비 테스트하기',
    },
  })
  @ResponseApi({})
  async testPrepareKakaoPayment() {
    return await this.paymentService.testKakaoPayment();
  }

  //INFO: redirect localhost:3000/payments/kakao/approve?pg_token=d5e92b8ef98ab269e0cc
  @Post('/kakao/prepare')
  @RequestApi({
    summary: {
      summary: '카카오 결제 준비하기 ',
      description: '카카오 결제 준비하기',
    },
  })
  @ResponseApi({
    type: PrepareKakaoPaymentDTO,
  })
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

  @Post('/toss/prepare/test')
  @RequestApi({
    summary: {
      summary: '토스 결제 준비 테스트하기 ',
      description: '토스 결제 준비 테스트하기',
    },
  })
  @ResponseApi({})
  async testPrepareTossPayment() {
    return await this.paymentService.testTossPayment();
  }

  //INFO: localhost:3000/payments/toss/approve?orderId=22_ESLTK&paymentKey=MKlA4XDvdYoEjb0gm23P0p5zR1lGv3pGwBJn5eya1RPQkx9q&amount=100
  @Post('/toss/prepare')
  @RequestApi({
    summary: {
      summary: '토스 결제 준비하기 ',
      description: '토스 결제 준비하기',
    },
  })
  @ResponseApi({
    type: CreateTossPaymentDTO,
  })
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
