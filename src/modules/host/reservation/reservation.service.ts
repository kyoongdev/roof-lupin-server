import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { ReservationDTO } from '@/modules/reservation/dto';
import {
  RESERVATION_ALREADY_APPROVED,
  RESERVATION_ERROR_CODE,
  RESERVATION_HOST_FIND_FORBIDDEN,
  RESERVATION_SPACE_NOT_IMMEDIATE,
} from '@/modules/reservation/exception/errorCode';
import { ReservationException } from '@/modules/reservation/exception/reservation.exception';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';

@Injectable()
export class HostReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async findReservation(id: string, hostId: string) {
    const reservation = await this.reservationRepository.findReservation(id);
    if (reservation.space.hostId !== hostId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.FORBIDDEN(RESERVATION_HOST_FIND_FORBIDDEN));
    }
    return reservation;
  }

  async findReservations(args = {} as Prisma.ReservationFindManyArgs) {
    return await this.reservationRepository.findReservations(args);
  }

  async findPagingReservations(paging: PagingDTO, hostId: string, args = {} as Prisma.ReservationFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reservationRepository.countReservations({
      where: args.where,
    });
    const reservations = await this.reservationRepository.findReservations({
      where: {
        rentalTypes: {
          some: {
            rentalType: {
              space: {
                hostId,
              },
            },
          },
        },
        ...args.where,
      },
      skip,
      take,
    });

    return new PaginationDTO<ReservationDTO>(reservations, { count, paging });
  }

  async approveReservation(id: string, hostId: string) {
    const reservation = await this.findReservation(id, hostId);

    if (!reservation.space.isImmediateReservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.CONFLICT(RESERVATION_SPACE_NOT_IMMEDIATE));
    }
    if (reservation.isApproved) {
      throw new ReservationException(RESERVATION_ERROR_CODE.CONFLICT(RESERVATION_ALREADY_APPROVED));
    }

    await this.reservationRepository.updateReservation(id, {
      isApproved: true,
    });
  }

  async cancelReservation(id: string, hostId: string) {
    const reservation = await this.findReservation(id, hostId);

    if (!reservation.space.isImmediateReservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.CONFLICT(RESERVATION_SPACE_NOT_IMMEDIATE));
    }
    if (reservation.isApproved) {
      throw new ReservationException(RESERVATION_ERROR_CODE.CONFLICT(RESERVATION_ALREADY_APPROVED));
    }

    await this.reservationRepository.updateReservation(id, {
      isApproved: false,
      isCanceled: true,
    });
  }
}
