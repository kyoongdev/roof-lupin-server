import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateSearchRecommendDTO, CreateSearchRecordDTO, SearchRecommendDTO, SearchRecordDTO, UpdateSearchRecommendDTO } from './dto';
export declare class SearchRepository {
    private readonly database;
    constructor(database: PrismaService);
    findSearchRecord(id: string): Promise<SearchRecordDTO>;
    findSearchRecords(args?: Prisma.SearchRecordFindManyArgs): Promise<SearchRecordDTO[]>;
    findSearchRecommend(id: string): Promise<SearchRecommendDTO>;
    countSearchRecommends(args?: Prisma.SearchRecommendCountArgs): Promise<number>;
    findSearchRecommends(args?: Prisma.SearchRecommendFindManyArgs): Promise<SearchRecommendDTO[]>;
    createSearchRecord(userId: string, data: CreateSearchRecordDTO): Promise<string>;
    deleteSearchRecord(id: string, userId: string): Promise<void>;
    deleteAllSearchRecords(userId: string): Promise<void>;
    createSearchRecommend(data: CreateSearchRecommendDTO): Promise<string>;
    updateSearchRecommend(id: string, data: UpdateSearchRecommendDTO): Promise<void>;
    deleteSearchRecommend(id: string): Promise<void>;
    countRecentSpaces(args?: Prisma.RecentSpaceCountArgs): Promise<number>;
    createRecentSpace(userId: string, spaceId: string): Promise<void>;
}
