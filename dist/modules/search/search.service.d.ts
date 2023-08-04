import type { Prisma } from '@prisma/client';
import { SpaceRepository } from '../space/space.repository';
import { SearchRepository } from './search.repository';
export declare class SearchService {
    private readonly searchRepository;
    private readonly spaceRepository;
    constructor(searchRepository: SearchRepository, spaceRepository: SpaceRepository);
    findSearchRecord(id: string): Promise<import("./dto").SearchRecordDTO>;
    findSearchRecords(args?: Prisma.SearchRecordFindManyArgs): Promise<import("./dto").SearchRecordDTO[]>;
    findSearchRecommends(args?: Prisma.SearchRecommendFindManyArgs): Promise<import("./dto").SearchRecommendDTO[]>;
    deleteSearchRecord(id: string, userId: string): Promise<void>;
    deleteAllSearchRecords(userId: string): Promise<void>;
    findMyRecentSpace(userId: string): Promise<import("../space/dto").SpaceDTO[]>;
    countMyRecentSpaces(userId: string): Promise<number>;
}
