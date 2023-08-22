import { Injectable } from '@nestjs/common';

import { PagingDTO } from 'cumuco-nestjs';

import { PagingRankingDTO } from './dto';
import { RankingRepository } from './ranking.repository';

@Injectable()
export class RankingService {
  constructor(private readonly rankingRepository: RankingRepository) {}

  async findRanking(id: string) {
    return await this.rankingRepository.findRanking(id);
  }

  async findRankingPagingSpaces(id: string, paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.rankingRepository.countRankingSpaces(id);
    const ranking = await this.rankingRepository.findRanking(id, {
      skip,
      take,
    });

    return new PagingRankingDTO({
      ...ranking,
      paging: {
        count,
        paging,
      },
    });
  }

  async findRankingIds() {
    return await this.rankingRepository.findRankingIds();
  }
}
