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
      const isPossible = existingReservations.reduce<boolean>((acc, next) => {
        if (next.startAt <= data.startAt && data.startAt < next.endAt) {
          acc = false;
        }

        if (next.startAt < data.endAt && data.endAt <= next.endAt) {
          acc = false;
        }

        return acc;
      }, true);

      if (!isPossible) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
      }
    }

    if (rentalType.rentalType === '시간') {
      //INFO: 예약 시도하는 시간이 시작 시간보다 빠르거나 끝 시간보다 느린지 여부 확인
      if (rentalType.startAt > data.startAt || rentalType.endAt < data.endAt) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
      }
      //INFO: 대여 정보가 올바르지 않을 경우
      if (!rentalType.timeCostInfos) {
        throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));
      }

      const timeCostInfos = rentalType.timeCostInfos;

      const realCost = timeCostInfos.reduce<number>((acc, next) => {
        if (17 <= next.startAt || next.endAt <= 20) {
          acc += next.cost;
        }
        return acc;
      }, 0);

      if (realCost !== data.cost) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
      }
    } else if (rentalType.rentalType === '패키지') {
      if (rentalType.startAt !== data.startAt || rentalType.endAt !== data.endAt) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
      }
    } else throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));

    await this.reservationRepository.createReservation(userId, data);
  }

  async deleteMyReservation(id: string, userId: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.user.id !== userId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_USER_DELETE_FORBIDDEN));
    }

    await this.reservationRepository.deleteReservation(id);
  }
}
