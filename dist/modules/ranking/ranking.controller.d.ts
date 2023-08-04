import { PagingDTO } from 'cumuco-nestjs';
import { PagingRankingDTO, RankingDTO, RankingIdsDTO } from './dto';
import { RankingService } from './ranking.service';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRanking(id: string): Promise<RankingDTO>;
    getRankingPagingSpaces(id: string, paging: PagingDTO): Promise<PagingRankingDTO>;
    getRankingIds(): Promise<RankingIdsDTO>;
}
