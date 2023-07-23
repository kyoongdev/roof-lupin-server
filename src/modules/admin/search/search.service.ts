import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CreateSearchRecommendDTO, SearchRecommendDTO, UpdateSearchRecommendDTO } from '@/modules/search/dto';
import { SearchRepository } from '@/modules/search/search.repository';

@Injectable()
export class AdminSearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async findSearchRecommend(id: string) {
    return await this.searchRepository.findSearchRecommend(id);
  }

  async findPagingSearchRecommends(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.searchRepository.countSearchRecommends();
    const searchRecommends = await this.searchRepository.findSearchRecommends({
      skip,
      take,
    });

    return new PaginationDTO<SearchRecommendDTO>(searchRecommends, { count, paging });
  }

  async createSearchRecommend(data: CreateSearchRecommendDTO) {
    return await this.searchRepository.createSearchRecommend(data);
  }

  async updateSearchRecommend(id: string, data: UpdateSearchRecommendDTO) {
    await this.searchRepository.findSearchRecommend(id);
    await this.searchRepository.updateSearchRecommend(id, data);
  }

  async deleteSearchRecommend(id: string) {
    await this.searchRepository.findSearchRecommend(id);
    await this.searchRepository.deleteSearchRecommend(id);
  }
}
