import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { SpaceSQL } from '@/sql';

import { HolidayService } from '../holiday/holiday.service';
import { SearchRepository } from '../search/search.repository';

import { InterestedDTO, SpaceDTO } from './dto';
import { FindSpacesQuery } from './dto/query';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { SpaceRepository } from './space.repository';

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly searchRepository: SearchRepository,
    private readonly holidayService: HolidayService
  ) {}

  async findSpaceIds() {
    return this.spaceRepository.findSpaceIds();
  }

  async findSpace(id: string, userId?: string) {
    const space = await this.spaceRepository.findSpace(id, userId);

    if (space.host.deletedAt) {
      throw new SpaceException(SPACE_ERROR_CODE.SPACE_NOT_FOUND);
    }

    if (userId) {
      await this.searchRepository.createRecentSpace(userId, id);
    }

    return space;
  }

  async findPagingSpaces(userId: string, paging: PagingDTO, args = {} as Prisma.SpaceFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.spaceRepository.countSpaces({
      where: args.where,
    });
    const spaces = await this.spaceRepository.findSpaces(
      {
        ...args,
        skip,
        take,
      },
      userId
    );
    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async findPagingSpacesWithSQL(paging: PagingDTO, query?: FindSpacesQuery, userId?: string) {
    const location = query.getFindByLocationQuery();
    const date = query.getFindByDateQuery();
    const isDistance = query.sort === 'DISTANCE' || Boolean(location);

    if (isDistance) {
      if (!query.lat && !query.lng && !query.distance) {
        throw new SpaceException(SPACE_ERROR_CODE.CURRENT_LOCATION_BAD_REQUEST);
      }
    }

    if (query.keyword && userId) {
      await this.searchRepository.createSearchRecord(userId, {
        content: query.keyword,
      });
    }

    const isHoliday = date ? await this.holidayService.checkIsHoliday(date.year, date.month, date.day) : false;
    const spaceSql = new SpaceSQL({
      query,
      paging: paging.getSqlPaging(),
      userId,
      isHoliday: isHoliday ? isHoliday.isHoliday : false,
    });

    const { spaces, count } = await this.spaceRepository.findSpacesWithSQL(spaceSql.getSQLQuery());

    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    return await this.spaceRepository.findSpaces(args);
  }

  async findSpaceIsInterested(userId: string, spaceId: string) {
    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    return new InterestedDTO({ isInterested });
  }

  async createInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.ALREADY_INTERESTED);
    }

    await this.spaceRepository.createInterest(userId, spaceId);
  }

  async deleteInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (!isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_INTERESTED);
    }

    await this.spaceRepository.deleteInterest(userId, spaceId);
  }
}
