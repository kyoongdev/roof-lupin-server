import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { RENTAL_TYPE_ERROR, SPACE_ERROR_CODE } from '../space/exception/errorCode';
import { SpaceException } from '../space/exception/space.exception';
import { SpaceRepository } from '../space/space.repository';

import { CreateReservationDTO, ReservationDTO } from './dto';
import {
  RESERVATION_COST_BAD_REQUEST,
  RESERVATION_ERROR_CODE,
  RESERVATION_TIME_BAD_REQUEST,
  RESERVATION_USER_DELETE_FORBIDDEN,
  RESERVATION_USER_FIND_FORBIDDEN,
} from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly spaceRepository: SpaceRepository
  ) {}

  async findMyPagingReservations(paging: PagingDTO, userId: string) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reservationRepository.countReservations({
      where: {
        userId,
      },
    });
    const reservations = await this.reservationRepository.findReservations({
      where: {
        userId,
        deletedAt: null,
      },
      skip,
      take,
    });

    return new PaginationDTO<ReservationDTO>(reservations, { count, paging });
  }

  async findMyReservation(id: string, userId: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.user.id !== userId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_USER_FIND_FORBIDDEN));
    }

    return reservation;
  }

  async createReservation(userId: string, data: CreateReservationDTO) {
    await this.validateReservation(data);
    return await this.reservationRepository.createReservation(userId, data);
  }

  async updateReservation(id: string, userId: string, data: CreateReservationDTO) {
    await this.findMyReservation(id, userId);
    await this.validateReservation(data);
    await this.reservationRepository.updateReservation(id, data);
  }

  async deleteMyReservation(id: string, userId: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.user.id !== userId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_USER_DELETE_FORBIDDEN));
    }

    await this.reservationRepository.deleteReservation(id);
  }

  async validateReservation(data: CreateReservationDTO) {
    const { rentalTypeId } = data;
    const rentalType = await this.spaceRepository.findRentalType(rentalTypeId);
    const existingReservations = await this.reservationRepository.findReservations({
      where: {
        rentalTypeId,
        year: data.year,
        month: data.month,
        day: data.day,
      },
    });

    //INFO: 예약 시도하는 시간에 예약된 건이 있는지 여부 확인
    if (existingReservations.length > 0) {
      data.validateIsReservationExist(existingReservations);
    }

    if (rentalType.rentalType === '시간') {
      data.validateTimeReservation(rentalType);
    } else if (rentalType.rentalType === '패키지') {
      data.validatePackageReservation(rentalType);
    } else throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));
  }
}
