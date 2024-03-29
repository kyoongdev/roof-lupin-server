import { Injectable } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { ValidateAccountQuery, ValidatedAccountDTO } from '@/modules/payment/dto';
import { PAYMENT_ERROR_CODE } from '@/modules/payment/exception/errorCode';
import { PaymentException } from '@/modules/payment/exception/payment.exception';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { PortOneProvider, TossPayProvider } from '@/utils';

import { HostSettlementRepository } from '../settlement/settlement.repository';

@Injectable()
export class HostPaymentService {
  constructor(
    private readonly portOne: PortOneProvider,
    private readonly reservationRepository: ReservationRepository,
    private readonly tossPayProvider: TossPayProvider,
    private readonly settlementRepository: HostSettlementRepository,
    private readonly messageEvent: MessageEvent
  ) {}

  async validateAccount(data: ValidateAccountQuery) {
    const isValid = await this.portOne.validateAccount({
      bank_code: data.bankCode,
      bank_num: data.bankNum,
      bank_holder: data.bankHolder,
    });

    return new ValidatedAccountDTO({ isValid });
  }

  async refundPayment(id: string, hostId: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.space.hostId !== hostId) {
      throw new PaymentException(PAYMENT_ERROR_CODE.PAYMENT_REFUND_FORBIDDEN);
    }

    if (!reservation.payedAt || !reservation.orderResultId) {
      throw new PaymentException(PAYMENT_ERROR_CODE.PAYMENT_REFUND_FORBIDDEN);
    }

    await this.tossPayProvider.cancelPaymentByPaymentKey(reservation.orderResultId, {
      cancelAmount: reservation.totalCost,
      cancelReason: '호스트 환불 요청',
    });

    await this.reservationRepository.updateReservation(id, {
      cancel: {
        refundCost: reservation.totalCost,
        reason: '호스트 환불 요청',
        hostId,
      },
    });

    const settlement = await this.settlementRepository.findSettlement(reservation.settlementId);

    const oldTotalCost = reservation.totalCost;
    const newTotalCost = reservation.totalCost - reservation.totalCost;

    await this.settlementRepository.updateSettlement(
      settlement.id,
      settlement.getNewSettlementCostInfo(oldTotalCost, newTotalCost, reservation.totalCost)
    );

    this.messageEvent.createReservationHostCanceledAlarm({
      nickname: reservation.user.nickname || reservation.user.name,
      reservationId: reservation.id,
      spaceName: reservation.space.title,
      userId: reservation.user.id,
    });

    return reservation.id;
  }
}
