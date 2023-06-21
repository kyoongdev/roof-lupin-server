import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceRepository } from '../space/space.repository';

import { BlockedTimeRepository } from './blocked-time.repository';
import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from './dto';
import { BlockedTimeException } from './exception/blocked-time';
import {
  BLOCKED_TIME_ERROR_CODE,
  BLOCKED_TIME_MUTATION_FORBIDDEN,
  BLOCKED_TIME_RESERVATION_EXISTS,
} from './exception/errorCode';

@Injectable()
export class BlockedTimeService {
  constructor(
    private readonly blockedTimeRepository: BlockedTimeRepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly spaceRepository: SpaceRepository
  ) {}

  async findBlockedTime(id: string) {
    return await this.blockedTimeRepository.findBlockedTime(id);
  }

  async findPagingBlockedTimes(paging: PagingDTO, args = {} as Prisma.BlockedTimeFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.blockedTimeRepository.countBlockedTimes({
      where: args.where,
    });
    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: args.where,
      orderBy: [
        {
          year: 'desc',
        },
        {
          month: 'desc',
        },
        {
          day: 'desc',
        },
      ],
      skip,
      take,
    });
    return new PaginationDTO<BlockedTimeDTO>(blockedTimes, { paging, count });
  }

  async createBlockedTime(hostId: string, data: CreateBlockedTimeDTO) {
    const space = await this.spaceRepository.findSpace(data.spaceId);

    if (space.host.id !== hostId) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.FORBIDDEN(BLOCKED_TIME_MUTATION_FORBIDDEN));
    }

    const reservations = await this.reservationRepository.findReservations({
      where: {
        year: data.year,
        month: data.month,
        day: data.day,
        rentalType: {
          spaceId: data.spaceId,
        },
      },
    });
    reservations.forEach((reservation) => {
      if (data.startAt <= reservation.endAt && reservation.startAt <= data.endAt) {
        throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.CONFLICT(BLOCKED_TIME_RESERVATION_EXISTS));
      }
    });
    return await this.blockedTimeRepository.createBlockedTime(data);
  }

  async updateBlockedTime(id: string, hostId: string, data: UpdateBlockedTimeDTO) {
    const blockedTime = await this.findBlockedTime(id);
    const space = await this.spaceRepository.findSpace(blockedTime.spaceId);

    if (space.host.id !== hostId) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.FORBIDDEN(BLOCKED_TIME_MUTATION_FORBIDDEN));
    }
    const reservations = await this.reservationRepository.findReservations({
      where: {
        year: data.year,
        month: data.month,
        day: data.day,
        rentalType: {
          spaceId: blockedTime.spaceId,
        },
      },
    });
    reservations.forEach((reservation) => {
      if (data.startAt <= reservation.endAt && reservation.startAt <= data.endAt) {
        throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.CONFLICT(BLOCKED_TIME_RESERVATION_EXISTS));
      }
    });
    return await this.blockedTimeRepository.updateBlockedTime(id, data);
  }

  async deleteBlockedTime(id: string, hostId: string) {
    const blockedTime = await this.findBlockedTime(id);
    const space = await this.spaceRepository.findSpace(blockedTime.spaceId);

    if (space.host.id !== hostId) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.FORBIDDEN(BLOCKED_TIME_MUTATION_FORBIDDEN));
    }

    await this.blockedTimeRepository.deleteBlockedTime(id);
  }
}
