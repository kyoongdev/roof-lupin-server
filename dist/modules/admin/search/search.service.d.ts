import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CreateSearchRecommendDTO, SearchRecommendDTO, UpdateSearchRecommendDTO } from '@/modules/search/dto';
import { SearchRepository } from '@/modules/search/search.repository';
export declare class AdminSearchService {
    private readonly searchRepository;
    constructor(searchRepository: SearchRepository);
    findSearchRecommend(id: string): Promise<SearchRecommendDTO>;
    findPagingSearchRecommends(paging: PagingDTO): Promise<PaginationDTO<SearchRecommendDTO>>;
    createSearchRecommend(data: CreateSearchRecommendDTO): Promise<string>;
    updateSearchRecommend(id: string, data: UpdateSearchRecommendDTO): Promise<void>;
    deleteSearchRecommend(id: string): Promise<void>;
}
