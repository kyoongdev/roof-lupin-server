import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CreateRankingDTO, RankingDTO, UpdateRankingDTO } from '@/modules/ranking/dto';
import { RankingRepository } from '@/modules/ranking/ranking.repository';

@Injectable()
export class AdminRankingService {
  constructor(private readonly rankingRepository: RankingRepository) {}

  async findRanking(id: string) {
    return await this.rankingRepository.findRanking(id);
  }

  async findPagingRankings(paging: PagingDTO, args = {} as Prisma.RankingFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.rankingRepository.countRankings({
      where: args.where,
    });
    const rankings = await this.rankingRepository.findRankings({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<RankingDTO>(rankings, { count, paging });
  }

  async createRanking(data: CreateRankingDTO) {
    return await this.rankingRepository.createRanking(data);
  }

  async updateRanking(id: string, data: UpdateRankingDTO) {
    await this.findRanking(id);
    await this.rankingRepository.updateRanking(id, data);
  }

  async deleteRanking(id: string) {
    await this.findRanking(id);
    await this.rankingRepository.deleteRanking(id);
  }
}
