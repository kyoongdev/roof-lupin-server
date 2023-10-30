import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { MessageEvent } from '@/event/message';

import { ReservationDTO } from './dto';
import { FindReservationQuery } from './dto/query';
import { RESERVATION_ERROR_CODE } from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly messageEvent: MessageEvent
  ) {}

  async findMyPagingReservations(paging: PagingDTO, userId: string, args = {} as Prisma.ReservationFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reservationRepository.countReservations({
      where: {
        userId,
        space: {
          deletedAt: null,
        },
        ...args.where,
      },
    });

    const reservations = await this.reservationRepository.findReservations(
      {
        where: {
          userId,
          space: {
            deletedAt: null,
          },
          ...args.where,
        },
        skip,
        take,
      },
      userId
    );

    return new PaginationDTO<ReservationDTO>(reservations, { count, paging });
  }

  async findMyReservation(id: string, userId: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.user.id !== userId || reservation.space.deletedAt) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_USER_FIND_FORBIDDEN);
    }

    return reservation;
  }

  async findMyCloseReservation(userId: string) {
    const currentDate = new Date();
    return await this.reservationRepository.findFirstReservation({
      where: {
        userId,
        OR: FindReservationQuery.getApproachingWhere(currentDate),
        cancel: null,
        deletedAt: null,
        space: {
          deletedAt: null,
        },
      },
      orderBy: [
        {
          day: 'desc',
        },
      ],
    });
  }

  async deleteMyReservation(id: string, userId: string, reason?: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.user.id !== userId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_USER_DELETE_FORBIDDEN);
    }

    if (reservation.payedAt) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_ALREADY_PAYED);
    }

    if (reason) {
      if (!reservation.space.isImmediateReservation && reservation.isApproved) {
        this.messageEvent.createReservationGuestCanceledAlarm({
          nickname: reservation.user.nickname || reservation.user.name,
          reason,
          reservationId: reservation.id,
          spaceId: reservation.space.id,
          spaceName: reservation.space.title,
          userId,
        });
      }

      await this.reservationRepository.updateReservation(id, {
        cancel: {
          reason,
          userId,
        },
      });
    }
  }
}
