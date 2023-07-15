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
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository, private readonly spaceRepository: SpaceRepository) {}

  async findSearchRecord(id: string) {
    return await this.searchRepository.findSearchRecord(id);
  }

  async findSearchRecords(args = {} as Prisma.SearchRecordFindManyArgs) {
    return await this.searchRepository.findSearchRecords(args);
  }

  async findSearchRecommends(args = {} as Prisma.SearchRecommendFindManyArgs) {
    return await this.searchRepository.findSearchRecommends(args);
  }

  async deleteSearchRecord(id: string, userId: string) {
    const searchRecord = await this.findSearchRecord(id);

    if (searchRecord.userId !== userId) {
      throw new SearchException(SEARCH_ERROR_CODE.FORBIDDEN(SEARCH_RECORD_FORBIDDEN));
    }

    await this.searchRepository.deleteSearchRecord(id, userId);
  }

  async deleteAllSearchRecords(userId: string) {
    await this.searchRepository.deleteAllSearchRecords(userId);
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
    return await this.searchRepository.countRecentSpaces({
      where: {
        userId,
      },
    });
  }
}
