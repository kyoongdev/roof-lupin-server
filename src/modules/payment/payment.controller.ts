import { Body, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { BANK_CODE } from '@/common/constants';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { ReservationDetailDTO } from '../reservation/dto';

import {
  BankCodeDTO,
  ConfirmTossPaymentDTO,
  CreatePaymentPayloadDTO,
  PaymentPayloadDTO,
  RefundPaymentDTO,
  ValidateAccountQuery,
  ValidatedAccountDTO,
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

  @Post('/payload')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      summary: '결제 용 data 생성 ',
      description: '결제 용 data 생성',
    },
  })
  @ResponseApi({
    type: PaymentPayloadDTO,
  })
  async getPaymentPayload(@Body() data: CreatePaymentPayloadDTO) {
    return await this.paymentService.createPaymentPayload(data);
  }

  @Post('/complete')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      summary: '결제 완료하기 ',
      description: '결제 완료하기',
    },
  })
  @ResponseApi({
    type: ReservationDetailDTO,
  })
  async completeTossPayment(@Body() data: ConfirmTossPaymentDTO, @ReqUser() user: RequestUser) {
    return await this.paymentService.confirmTossPayment(data, user.id);
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

  @Delete('/failure/:orderId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '결제 실패 시 결제 정보 삭제하기',
      summary: '결제 실패 시 결제 정보 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deletePaymentInfo(@ReqUser() user: RequestUser, @Param('orderId') orderId: string) {
    await this.paymentService.deletePayment(orderId, user.id);
  }
}
