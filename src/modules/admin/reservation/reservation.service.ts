import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { ReservationDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';

@Injectable()
export class AdminReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async findReservation(id: string) {
    return await this.reservationRepository.findReservation(id);
  }

  async findPagingReservations(paging: PagingDTO, args = {} as Prisma.ReservationFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reservationRepository.countReservations({
      where: args.where,
    });
    const reservations = await this.reservationRepository.findReservations({
      ...args,
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<ReservationDTO>(reservations, { count, paging });
  }
}
