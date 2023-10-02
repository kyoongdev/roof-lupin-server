import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { MessageEvent } from '@/event/message';
import { ReservationDTO } from '@/modules/reservation/dto';
import { RESERVATION_ERROR_CODE } from '@/modules/reservation/exception/errorCode';
import { ReservationException } from '@/modules/reservation/exception/reservation.exception';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { TossPayProvider } from '@/utils';

import { HostCancelReservationDTO } from '../dto/reservation';

@Injectable()
export class HostReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly tossPay: TossPayProvider,
    private readonly messageEvent: MessageEvent
  ) {}

  async findReservation(id: string, hostId: string) {
    const reservation = await this.reservationRepository.findReservation(id);
    if (reservation.space.hostId !== hostId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_HOST_FIND_FORBIDDEN);
    }
    return reservation;
  }

  async findReservations(hostId: string, args = {} as Prisma.ReservationFindManyArgs) {
    return await this.reservationRepository.findReservations({
      ...args,
      where: {
        ...args.where,
        rentalTypes: {
          some: {
            rentalType: {
              space: {
                hostId,
              },
            },
          },
        },
      },
    });
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

    if (reservation.space.isImmediateReservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_SPACE_NOT_IMMEDIATE);
    }
    if (reservation.isApproved) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_ALREADY_APPROVED);
    }

    await this.reservationRepository.updateReservation(id, {
      isApproved: true,
    });

    this.messageEvent.createReservationAutoCanceledAlarm({
      approvedAt: new Date(),
      nickname: reservation.user.nickname || reservation.user.name,
      reservationId: reservation.id,
      spaceName: reservation.space.title,
      userId: reservation.user.id,
    });
    this.messageEvent.createReservationAcceptedAlarm({
      nickname: reservation.user.nickname || reservation.user.name,
      reservationId: reservation.id,
      spaceName: reservation.space.title,
      userId: reservation.user.id,
    });
  }

  async rejectReservation(id: string, hostId: string, data: HostCancelReservationDTO) {
    const reservation = await this.findReservation(id, hostId);

    if (!reservation.space.isImmediateReservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_SPACE_NOT_IMMEDIATE);
    }
    if (reservation.isApproved) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_ALREADY_APPROVED);
    }

    await this.reservationRepository.updateReservation(id, {
      isApproved: false,
      cancel: {
        reason: data.cancelReason,
      },
    });

    this.messageEvent.createReservationRejectedAlarm({
      nickname: reservation.user.nickname || reservation.user.name,
      reservationId: reservation.id,
      spaceName: reservation.space.title,
      userId: reservation.user.id,
    });
  }

  async cancelReservation(id: string, hostId: string, data: HostCancelReservationDTO) {
    const reservation = await this.findReservation(id, hostId);

    const isRefund = Boolean(reservation.payedAt) && reservation.orderResultId;

    if (!reservation.space.isImmediateReservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_SPACE_NOT_IMMEDIATE);
    }

    if (isRefund) {
      await this.tossPay.cancelPaymentByPaymentKey(reservation.orderResultId, {
        cancelAmount: reservation.totalCost,
        cancelReason: data.cancelReason,
      });
    }

    await this.reservationRepository.updatePayment(id, {
      isApproved: false,
      cancel: {
        reason: data.cancelReason,
        hostId,
        ...(isRefund && {
          refundCost: reservation.totalCost,
        }),
      },
    });

    this.messageEvent.createReservationHostCanceledAlarm({
      nickname: reservation.user.nickname || reservation.user.name,
      reservationId: reservation.id,
      spaceName: reservation.space.title,
      userId: reservation.user.id,
    });
  }
}
