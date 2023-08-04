import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { SpaceDetailDTO, SpaceDTO, SpaceIdsDTO } from './dto';
import { InterestedDTO } from './dto/interested.dto';
import { FindSpacesQuery } from './dto/query';
import { SpaceService } from './space.service';
export declare class SpaceController {
    private readonly spaceService;
    constructor(spaceService: SpaceService);
    getSpace(id: string, user?: RequestUser): Promise<SpaceDetailDTO>;
    getIsSpaceInterested(id: string, user: RequestUser): Promise<InterestedDTO>;
    getSpaceIds(): Promise<SpaceIdsDTO[]>;
    getPagingSpaces(paging: PagingDTO, query: FindSpacesQuery, user?: RequestUser): Promise<import("cumuco-nestjs").PaginationDTO<SpaceDTO>>;
    getPagingInterestSpaces(paging: PagingDTO, user: RequestUser): Promise<import("cumuco-nestjs").PaginationDTO<SpaceDTO>>;
    createSpaceInterest(spaceId: string, user: RequestUser): Promise<void>;
    deleteSpaceInterest(spaceId: string, user: RequestUser): Promise<void>;
}
