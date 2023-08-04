import { RequestUser } from '@/interface/role.interface';
import { SpaceDTO } from '../space/dto';
import { SearchRecommendDTO, SearchRecordDTO } from './dto';
import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    getSearchRecords(user: RequestUser): Promise<SearchRecordDTO[]>;
    getSearchRecommends(): Promise<SearchRecommendDTO[]>;
    deleteSearchRecord(user: RequestUser, id: string): Promise<void>;
    deleteAllSearchRecord(user: RequestUser): Promise<void>;
    getRecentSearchSpaces(user: RequestUser): Promise<SpaceDTO[]>;
}
