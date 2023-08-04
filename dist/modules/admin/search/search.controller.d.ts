import { PagingDTO } from 'cumuco-nestjs';
import { IdsDTO } from '@/common';
import { CreateSearchRecommendDTO, SearchRecommendDTO, UpdateSearchRecommendDTO } from '@/modules/search/dto';
import { AdminSearchService } from './search.service';
export declare class AdminSearchController {
    private readonly searchService;
    constructor(searchService: AdminSearchService);
    getSearchRecommend(id: string): Promise<SearchRecommendDTO>;
    getPagingSearchRecommends(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<SearchRecommendDTO>>;
    createSearchRecommend(body: CreateSearchRecommendDTO): Promise<string>;
    updateSearchRecommend(id: string, body: UpdateSearchRecommendDTO): Promise<void>;
    deleteSearchRecommend(query: IdsDTO): Promise<void>;
}
