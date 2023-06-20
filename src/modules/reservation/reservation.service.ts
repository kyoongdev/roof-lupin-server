import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { RENTAL_TYPE_ENUM } from '../space/dto/validation/rental-type.validation';
import { RENTAL_TYPE_ERROR, SPACE_ERROR_CODE } from '../space/exception/errorCode';
import { SpaceException } from '../space/exception/space.exception';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';

import { CreatePaymentDTO, ReservationDTO, UpdateReservationDTO } from './dto';
import {
  RESERVATION_ERROR_CODE,
  RESERVATION_USER_DELETE_FORBIDDEN,
  RESERVATION_USER_FIND_FORBIDDEN,
} from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly rentalTypeRepository: RentalTypeRepository
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

  async createReservation(userId: string, data: CreatePaymentDTO) {
    await this.validateReservation(data);
    const reservation = await this.reservationRepository.createReservation(userId, data);
    return reservation.id;
  }

  // async updateReservation(id: string, userId: string, data: UpdateReservationDTO) {
  //   await this.findMyReservation(id, userId);
  //   // await this.validateReservation(data);
  //   await this.reservationRepository.updateReservation(id, data);
  // }

  async deleteMyReservation(id: string, userId: string) {
    const reservation = await this.reservationRepository.findReservation(id);

    if (reservation.user.id !== userId) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_USER_DELETE_FORBIDDEN));
    }

    await this.reservationRepository.deleteReservation(id);
  }

  async validateReservation(data: CreatePaymentDTO) {
    const { rentalTypeId } = data;
    const rentalType = await this.rentalTypeRepository.findRentalType(rentalTypeId);
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

    if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
      data.validateTimeReservation(rentalType);
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      data.validatePackageReservation(rentalType);
    } else throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));
  }
}
