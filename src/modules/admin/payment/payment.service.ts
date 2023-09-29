import { Injectable } from '@nestjs/common';

import { HostSettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { PAYMENT_ERROR_CODE, PAYMENT_REFUND_AMOUNT } from '@/modules/payment/exception/errorCode';
import { PaymentException } from '@/modules/payment/exception/payment.exception';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { TossPayProvider } from '@/utils';

import { AdminRefundPaymentDTO } from '../dto/payment/admin-refund-payment.dto';

@Injectable()
export class AdminPaymentService {
  constructor(
    private readonly tossPay: TossPayProvider,
    private readonly reservationRepository: ReservationRepository,
    private readonly settlementRepository: HostSettlementRepository
  ) {}

  async refundPayment(reservationId: string, data: AdminRefundPaymentDTO) {
    const reservation = await this.reservationRepository.findReservation(reservationId);

    if (reservation.totalCost < data.refundCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_REFUND_AMOUNT));
    }
    await this.tossPay.cancelPaymentByPaymentKey(reservation.orderResultId, {
      cancelAmount: data.refundCost,
      cancelReason: '사용자 환불 요청',
    });

    const settlement = await this.settlementRepository.findSettlement(reservation.settlementId);

    const oldTotalCost = reservation.totalCost;
    const newTotalCost = reservation.totalCost - data.refundCost;

    await this.settlementRepository.updateSettlement(
      settlement.id,
      settlement.getNewSettlementCostInfo(oldTotalCost, newTotalCost, data.refundCost)
    );
  }
}
