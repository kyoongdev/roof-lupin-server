import { Body, Get, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { BANK_CODE } from '@/common/constants';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreatePaymentDTO } from '../reservation/dto';

import {
  ApproveKakaoPaymentDTO,
  BankCodeDTO,
  CompletePortOnePaymentDTO,
  ConfirmTossPaymentDTO,
  CreateTossPaymentDTO,
  PortOnePreparePaymentDTO,
  PrepareKakaoPaymentDTO,
  RefundPaymentDTO,
} from './dto';
import { PaymentService } from './payment.service';

@ApiController('payments', '결제')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/accounts/validate')
  @RequestApi({
    summary: {
      summary: '계좌 유효성 검사하기 ',
      description: '계좌 유효성 검사하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async validateAccount() {
    return await this.paymentService.validateAccount();
  }

  @Get('/accounts')
  @RequestApi({
    summary: {
      summary: '계좌 유효성 검사하기 ',
      description: '계좌 유효성 검사하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async validateAccountCallback(@Query() query: any) {
    return { asdf: 'asdfsa' };
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
        code: value,
        name: key,
      });
    });
  }

  @Post('/port-one/prepare')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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

  @Post('/kakao/prepare')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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

  @Post('/toss/prepare')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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

  @Post('/refund')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      summary: '결제 취소하기 ',
      description: '결제 취소하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async refundPayment(@ReqUser() user: RequestUser, @Body() body: RefundPaymentDTO) {
    return await this.paymentService.refundPayment(user.id, body);
  }
}
