import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceRepository } from '../space/space.repository';

import { CreateSearchRecommendDTO, CreateSearchRecordDTO, SearchRecommendDTO, SearchRecordDTO } from './dto';
import {
  SEARCH_ERROR_CODE,
  SEARCH_RECOMMEND_NOT_FOUND,
  SEARCH_RECORD_FORBIDDEN,
  SEARCH_RECORD_NOT_FOUND,
} from './exception/errorCode';
import { SearchException } from './exception/search.exception';

@Injectable()
export class SearchService {
  constructor(private readonly database: PrismaService, private readonly spaceRepository: SpaceRepository) {}

  async findSearchRecord(id: string) {
    const searchRecord = await this.database.searchRecord.findUnique({
      where: {
        id,
      },
    });

    if (!searchRecord) {
      throw new SearchException(SEARCH_ERROR_CODE.NOT_FOUND(SEARCH_RECORD_NOT_FOUND));
    }
    return new SearchRecordDTO(searchRecord);
  }

  async findSearchRecords(args = {} as Prisma.SearchRecordFindManyArgs) {
    const searchRecords = await this.database.searchRecord.findMany({
      ...args,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return searchRecords.map((searchRecord) => new SearchRecordDTO(searchRecord));
  }

  async findSearchRecommend(id: string) {
    const searchRecommend = await this.database.searchRecommend.findUnique({
      where: {
        id,
      },
    });

    if (!searchRecommend) {
      throw new SearchException(SEARCH_ERROR_CODE.NOT_FOUND(SEARCH_RECOMMEND_NOT_FOUND));
    }
    return new SearchRecommendDTO(searchRecommend);
  }

  async findSearchRecommends(args = {} as Prisma.SearchRecommendFindManyArgs) {
    const searchRecommends = await this.database.searchRecommend.findMany({
      ...args,
    });

    return searchRecommends.map((searchRecommend) => new SearchRecommendDTO(searchRecommend));
  }

  async createSearchRecord(userId: string, data: CreateSearchRecordDTO) {
    const isExist = await this.database.searchRecord.findFirst({
      where: {
        userId,
        content: data.content,
      },
    });

    if (!isExist) {
      const searchRecord = await this.database.searchRecord.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return searchRecord.id;
    }

    return isExist.id;
  }

  async deleteSearchRecord(id: string, userId: string) {
    const searchRecord = await this.findSearchRecord(id);

    if (searchRecord.userId !== userId) {
      throw new SearchException(SEARCH_ERROR_CODE.FORBIDDEN(SEARCH_RECORD_FORBIDDEN));
    }

    await this.database.searchRecord.delete({
      where: {
        id,
      },
    });
  }

  async deleteAllSearchRecords(userId: string) {
    await this.database.searchRecord.deleteMany({
      where: {
        userId,
      },
    });
  }

  async createSearchRecommend(data: CreateSearchRecommendDTO) {
    const searchRecommend = await this.database.searchRecommend.create({
      data,
    });

    return searchRecommend.id;
  }

  async deleteSearchRecommend(id: string) {
    await this.findSearchRecommend(id);

    await this.database.searchRecommend.delete({
      where: {
        id,
      },
    });
  }

  async findMyRecentSpace(userId: string) {
    const spaces = await this.spaceRepository.findSpaces({
      where: {
        recentSpaces: {
          some: {
            userId,
          },
        },
      },
    });
    return spaces;
  }

  async countMyRecentSpaces(userId: string) {
    const count = await this.database.recentSpace.count({
      where: {
        userId,
      },
    });
    return count;
  }

  async createRecentSpace(userId: string, spaceId: string) {
    await this.spaceRepository.findSpace(spaceId);

    const count = await this.countMyRecentSpaces(userId);

    if (count === 10) {
      const target = await this.database.recentSpace.findFirst({
        where: {
          userId,
        },
        orderBy: {
          viewedAt: 'asc',
        },
      });
      await this.database.recentSpace.delete({
        where: {
          userId_spaceId: {
            spaceId: target.spaceId,
            userId: target.userId,
          },
        },
      });
    }

    await this.database.recentSpace.create({
      data: {
        space: {
          connect: {
            id: spaceId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        viewedAt: new Date(),
      },
    });
  }
}
