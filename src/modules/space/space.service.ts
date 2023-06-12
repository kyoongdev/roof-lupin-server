import { Injectable } from '@nestjs/common';

import type { Prisma, Reservation, SpaceLocation } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { LocationRepository } from '../location/location.repository';
import { ReservationRepository } from '../reservation/reservation.repository';

import { SpaceDTO } from './dto';
import { FindByDateQuery } from './dto/query/find-by-date.query';
import { FindByLocationQuery } from './dto/query/find-by-location.query';
import { ALREADY_INTERESTED, NOT_INTERESTED, SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { SpaceRepository } from './space.repository';

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly locationRepository: LocationRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async findSpace(id: string, userId?: string) {
    return await this.spaceRepository.findSpace(id, userId);
  }

  async findPagingSpaces(
    paging: PagingDTO,
    args = {} as Prisma.SpaceFindManyArgs,
    location?: FindByLocationQuery,
    date?: FindByDateQuery
  ) {
    const { skip, take } = paging.getSkipTake();
    const includeSpaces: string[] = [];
    const excludeSpaces: string[] = [];
    if (location) {
      includeSpaces.push(
        ...(await this.locationRepository.getLocationsByDistance(paging, location)).map((location) => location.spaceId)
      );
    }
    if (date) {
      const results = await this.reservationRepository.findReservations({
        where: {
          year: date.year,
          month: date.month,
          day: date.day,
        },
      });
    }

    const whereArgs: Prisma.SpaceWhereInput = {
      ...(includeSpaces.length > 0 && {
        OR: includeSpaces.map((spaceId) => ({
          id: spaceId,
        })),
      }),
      ...args.where,
    };

    const count = await this.spaceRepository.countSpaces({
      where: whereArgs,
    });
    const spaces = await this.spaceRepository.findSpaces({
      where: whereArgs,
      orderBy: args.orderBy,
      skip,
      take,
    });

    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    return await this.spaceRepository.findSpaces(args);
  }

  async createInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(ALREADY_INTERESTED));
    }

    await this.spaceRepository.createInterest(userId, spaceId);
  }

  async deleteInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (!isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(NOT_INTERESTED));
    }

    await this.spaceRepository.deleteInterest(userId, spaceId);
  }
}
