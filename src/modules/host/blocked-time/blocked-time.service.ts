import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { ReservationDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { SpaceRepository } from '@/modules/space/space.repository';

import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';

import { HostBlockedTimeRepository } from './blocked-time.repository';
import { BlockedTimeException } from './exception/blocked-time';
import {
  BLOCKED_TIME_ERROR_CODE,
  BLOCKED_TIME_MUTATION_FORBIDDEN,
  BLOCKED_TIME_RESERVATION_EXISTS,
} from './exception/errorCode';

@Injectable()
export class HostBlockedTimeService {
  constructor(
    private readonly blockedTimeRepository: HostBlockedTimeRepository,
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
        year: Number(data.year),
        month: Number(data.month),
        day: Number(data.day),
        rentalTypes: {
          some: {
            rentalType: {
              spaceId: data.spaceId,
            },
          },
        },
      },
    });

    this.validateBlockTime(data.startAt, data.endAt, reservations);
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
        year: Number(data.year),
        month: Number(data.month),
        day: Number(data.day),
        rentalTypes: {
          some: {
            rentalType: {
              spaceId: blockedTime.spaceId,
            },
          },
        },
      },
    });
    this.validateBlockTime(data.startAt, data.endAt, reservations);

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

  validateBlockTime(startAt: number, endAt: number, reservations: ReservationDTO[]) {
    reservations.forEach(({ rentalTypes }) => {
      rentalTypes.forEach((rentalType) => {
        if (startAt <= rentalType.endAt && rentalType.startAt <= endAt) {
          throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.CONFLICT(BLOCKED_TIME_RESERVATION_EXISTS));
        }
      });
    });
  }
}
