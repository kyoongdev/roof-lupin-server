import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CreateRankingDTO, CreateRankingSpaceDTO, RankingDTO, UpdateRankingDTO, UpdateRankingSpaceDTO } from '@/modules/ranking/dto';
import { RankingRepository } from '@/modules/ranking/ranking.repository';
export declare class AdminRankingService {
    private readonly rankingRepository;
    constructor(rankingRepository: RankingRepository);
    findRanking(id: string): Promise<RankingDTO>;
    findPagingRankings(paging: PagingDTO, args?: Prisma.RankingFindManyArgs): Promise<PaginationDTO<RankingDTO>>;
    createRanking(data: CreateRankingDTO): Promise<string>;
    createRankingSpace(rankingId: string, data: CreateRankingSpaceDTO): Promise<void>;
    updateRanking(id: string, data: UpdateRankingDTO): Promise<void>;
    updateRankingSpace(rankingId: string, data: UpdateRankingSpaceDTO): Promise<void>;
    deleteRanking(id: string): Promise<void>;
    deleteRankingSpace(rankingId: string, spaceId: string): Promise<void>;
}
