import { Injectable } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';

import { CreatePaymentDTO } from '../reservation/dto';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReservationService } from '../reservation/reservation.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly kakaoPay: KakaoPayProvider
  ) {}

  async prepareKakaoPayment(userId: string, data: CreatePaymentDTO) {
    const reservation = await this.reservationRepository.createReservation(userId, data);
  }
}
