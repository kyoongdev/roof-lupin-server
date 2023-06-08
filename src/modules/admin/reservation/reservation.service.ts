import { Injectable } from '@nestjs/common';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

@Injectable()
export class AdminReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}
}
