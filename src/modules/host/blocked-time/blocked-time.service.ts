import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { ReservationDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { SpaceRepository } from '@/modules/space/space.repository';

import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';
import { CreateBlockedTimesDTO } from '../dto/blocked-time/create-block-times.dto';

import { HostBlockedTimeRepository } from './blocked-time.repository';
import { BlockedTimeException } from './exception/blocked-time';
import { BLOCKED_TIME_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class HostBlockedTimeService {
  constructor(
    private readonly blockedTimeRepository: HostBlockedTimeRepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly database: PrismaService
  ) {}

  async findBlockedTime(id: string) {
    return await this.blockedTimeRepository.findBlockedTime(id);
  }

  async findPagingBlockedTimes(paging: PagingDTO, args = {} as Prisma.BlockedTimeFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.blockedTimeRepository.countBlockedTimes({
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: {
        ...args.where,
        deletedAt: null,
      },
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
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.BLOCKED_TIME_MUTATION_FORBIDDEN);
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

  async createBlockedTimes(hostId: string, data: CreateBlockedTimesDTO) {
    const space = await this.spaceRepository.findSpace(data.spaceId);

    if (space.host.id !== hostId) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.BLOCKED_TIME_MUTATION_FORBIDDEN);
    }

    await Promise.all(
      data.blockTimes.map(async (blockTime) => {
        const reservations = await this.reservationRepository.findReservations({
          where: {
            year: Number(blockTime.year),
            month: Number(blockTime.month),
            day: Number(blockTime.day),
            rentalTypes: {
              some: {
                rentalType: {
                  spaceId: data.spaceId,
                },
              },
            },
          },
        });

        await this.database.$transaction(async (transaction) => {
          this.validateBlockTime(blockTime.startAt, blockTime.endAt, reservations);
          await this.blockedTimeRepository.createBlockedTimeWithTransaction(transaction, {
            ...blockTime,
            name: data.name,
            spaceId: data.spaceId,
          });
        });
      })
    );
  }

  async updateBlockedTime(id: string, hostId: string, data: UpdateBlockedTimeDTO) {
    const blockedTime = await this.findBlockedTime(id);
    const space = await this.spaceRepository.findSpace(blockedTime.spaceId);

    if (space.host.id !== hostId) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.BLOCKED_TIME_MUTATION_FORBIDDEN);
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
        cancel: null,
        deletedAt: null,
      },
    });
    this.validateBlockTime(data.startAt, data.endAt, reservations);

    return await this.blockedTimeRepository.updateBlockedTime(id, data);
  }

  async deleteBlockedTime(id: string, hostId: string) {
    const blockedTime = await this.findBlockedTime(id);
    const space = await this.spaceRepository.findSpace(blockedTime.spaceId);

    if (space.host.id !== hostId) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.BLOCKED_TIME_MUTATION_FORBIDDEN);
    }

    await this.blockedTimeRepository.deleteBlockedTime(id);
  }

  validateBlockTime(startAt: number, endAt: number, reservations: ReservationDTO[]) {
    if (startAt > endAt) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.BLOCKED_TIME_PERIOD);
    }

    reservations.forEach(({ rentalTypes }) => {
      rentalTypes.forEach((rentalType) => {
        if (startAt <= rentalType.endAt && rentalType.startAt <= endAt) {
          throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.BLOCKED_TIME_RESERVATION_EXISTS);
        }
      });
    });
  }
}
