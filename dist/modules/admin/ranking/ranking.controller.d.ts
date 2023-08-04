import { PagingDTO } from 'cumuco-nestjs';
import { CreateRankingDTO, CreateRankingSpaceDTO, RankingDTO, UpdateRankingDTO, UpdateRankingSpaceDTO } from '@/modules/ranking/dto';
import { FindRankingsQuery } from '@/modules/ranking/dto/query';
import { AdminRankingService } from './ranking.service';
export declare class AdminRankingController {
    private readonly rankingService;
    constructor(rankingService: AdminRankingService);
    getRanking(id: string): Promise<RankingDTO>;
    getRankings(paging: PagingDTO, query: FindRankingsQuery): Promise<import("cumuco-nestjs").PaginationDTO<RankingDTO>>;
    createRanking(body: CreateRankingDTO): Promise<string>;
    createRankingSpace(id: string, body: CreateRankingSpaceDTO): Promise<void>;
    updateRanking(id: string, body: UpdateRankingDTO): Promise<void>;
    updateRankingSpace(id: string, body: UpdateRankingSpaceDTO): Promise<void>;
    deleteRanking(id: string): Promise<void>;
    deleteRankingSpace(rankingId: string, spaceId: string): Promise<void>;
}
