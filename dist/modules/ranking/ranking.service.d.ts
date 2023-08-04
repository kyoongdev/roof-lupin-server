import { PagingDTO } from 'cumuco-nestjs';
import { PagingRankingDTO } from './dto';
import { RankingRepository } from './ranking.repository';
export declare class RankingService {
    private readonly rankingRepository;
    constructor(rankingRepository: RankingRepository);
    findRanking(id: string): Promise<import("./dto").RankingDTO>;
    findRankingPagingSpaces(id: string, paging: PagingDTO): Promise<PagingRankingDTO>;
    findRankingIds(): Promise<import("./dto").RankingIdsDTO>;
}
