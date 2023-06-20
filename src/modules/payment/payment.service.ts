import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';

import { CreatePaymentDTO } from '../reservation/dto';
import { ReservationRepository } from '../reservation/reservation.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';

import { PrepareKakaoPaymentDTO } from './dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly kakaoPay: KakaoPayProvider,
    private readonly tossPay: TossPayProvider
  ) {}

  async prepareKakaoPayment(userId: string, data: CreatePaymentDTO) {
    //TODO: 쿠폰 적용
    const reservation = await this.reservationRepository.createReservation(userId, data);

    const rentalType = await this.rentalTypeRepository.findRentalType(data.rentalTypeId);
    const orderId = this.createOrderId();
    const result = await this.kakaoPay.preparePayment({
      item_name: rentalType.name,
      quantity: 1,
      tax_free_amount: reservation.taxFreeCost,
      total_amount: reservation.totalCost,
      partner_order_id: orderId,
    });

    await this.reservationRepository.updatePayment(reservation.id, {
      orderId,
      orderResultId: result.tid,
    });

    return new PrepareKakaoPaymentDTO({
      ...result,
      orderId,
    });
  }

  async approveKakaoPayment() {
    //
  }

  createOrderId() {
    const code = nanoid(5);
    return `${new Date().getDate()}_${code.toUpperCase()}`;
  }
}
