import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateRankingDTO, CreateRankingSpaceDTO, RankingDTO, RankingIdsDTO, UpdateRankingDTO, UpdateRankingSpaceDTO } from './dto';
export declare class RankingRepository {
    private readonly database;
    constructor(database: PrismaService);
    findRankingIds(): Promise<RankingIdsDTO>;
    findRanking(id: string, args?: Prisma.Ranking$spacesArgs): Promise<RankingDTO>;
    countRankings(args?: Prisma.RankingCountArgs): Promise<number>;
    countRankingSpaces(rankingId: string): Promise<number>;
    findRankings(args?: Prisma.RankingFindManyArgs): Promise<RankingDTO[]>;
    createRanking(data: CreateRankingDTO): Promise<string>;
    createRankingSpace(rankingId: string, data: CreateRankingSpaceDTO): Promise<void>;
    updateRankingSpace(rankingId: string, data: UpdateRankingSpaceDTO): Promise<void>;
    updateRanking(id: string, data: UpdateRankingDTO): Promise<void>;
    deleteRanking(id: string): Promise<void>;
    deleteRankingSpace(rankingId: string, spaceId: string): Promise<void>;
}
