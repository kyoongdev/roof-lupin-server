import { Injectable } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';

import { CreatePaymentDTO } from '../reservation/dto';
import { ReservationRepository } from '../reservation/reservation.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';

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
    const result = await this.kakaoPay.preparePayment({
      item_name: rentalType.name,
      quantity: 1,
      tax_free_amount: reservation.taxFreeCost,
      total_amount: reservation.totalCost,
    });

    await this.reservationRepository.updateReservation(reservation.id, {});
  }
}
