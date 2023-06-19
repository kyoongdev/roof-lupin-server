import { Injectable } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';

import { CreatePaymentDTO } from '../reservation/dto';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReservationService } from '../reservation/reservation.service';
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
    const reservationId = await this.reservationRepository.createReservation(userId, data);

    const rentalType = await this.rentalTypeRepository.findRentalType(data.rentalTypeId);
  }
}
