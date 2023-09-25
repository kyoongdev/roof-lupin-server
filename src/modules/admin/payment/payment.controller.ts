import { Body, Param, Post } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ApiController, JwtAuthGuard } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminRefundPaymentDTO } from '../dto/payment/admin-refund-payment.dto';

import { AdminPaymentService } from './payment.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('payments', '[관리자] 결제')
export class AdminPaymentController {
  constructor(private readonly paymentService: AdminPaymentService) {}

  @Post(':reservationId/refund')
  @RequestApi({
    summary: {
      description: '결제 환불',
      summary: '결제 환불',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async refundPayment(@Param('reservationId') reservationId: string, @Body() body: AdminRefundPaymentDTO) {
    await this.paymentService.refundPayment(reservationId, body);
  }
}
