import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import {
  CreateSearchRecommendDTO,
  CreateSearchRecordDTO,
  SearchRecommendDTO,
  SearchRecordDTO,
  UpdateSearchRecommendDTO,
} from './dto';
import { SEARCH_ERROR_CODE } from './exception/errorCode';
import { SearchException } from './exception/search.exception';

@Injectable()
export class SearchRepository {
  constructor(private readonly database: PrismaService) {}

  async findSearchRecord(id: string) {
    const searchRecord = await this.database.searchRecord.findUnique({
      where: {
        id,
      },
    });

    if (!searchRecord) {
      throw new SearchException(SEARCH_ERROR_CODE.SEARCH_RECORD_NOT_FOUND);
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
      throw new SearchException(SEARCH_ERROR_CODE.SEARCH_RECOMMEND_NOT_FOUND);
    }
    return new SearchRecommendDTO(searchRecommend);
  }

  async countSearchRecommends(args = {} as Prisma.SearchRecommendCountArgs) {
    return await this.database.searchRecommend.count(args);
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

  async deleteSearchRecord(id: string) {
    await this.database.searchRecord.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
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

  async updateSearchRecommend(id: string, data: UpdateSearchRecommendDTO) {
    await this.database.searchRecommend.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteSearchRecommend(id: string) {
    await this.database.searchRecommend.delete({
      where: {
        id,
      },
    });
  }

  async countRecentSpaces(args = {} as Prisma.RecentSpaceCountArgs) {
    const count = await this.database.recentSpace.count(args);
    return count;
  }

  async createRecentSpace(userId: string, spaceId: string) {
    const isExist = await this.database.recentSpace.findFirst({
      where: {
        userId,
        spaceId,
      },
    });
    const count = await this.countRecentSpaces({
      where: {
        userId,
      },
    });

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
    if (isExist) {
      await this.database.recentSpace.update({
        where: {
          userId_spaceId: {
            spaceId,
            userId,
          },
        },
        data: {
          viewedAt: new Date(),
        },
      });
    } else {
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
}
