import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { HolidayService } from '../holiday/holiday.service';
import { SearchRepository } from '../search/search.repository';
import { InterestedDTO, SpaceDTO } from './dto';
import { FindSpacesQuery } from './dto/query';
import { SpaceRepository } from './space.repository';
export declare class SpaceService {
    private readonly spaceRepository;
    private readonly holidayService;
    private readonly searchRepository;
    constructor(spaceRepository: SpaceRepository, holidayService: HolidayService, searchRepository: SearchRepository);
    findSpaceIds(): Promise<import("./dto").SpaceIdsDTO[]>;
    findSpace(id: string, userId?: string): Promise<import("./dto").SpaceDetailDTO>;
    findPagingSpaces(paging: PagingDTO, args?: Prisma.SpaceFindManyArgs): Promise<PaginationDTO<SpaceDTO>>;
    findPagingSpacesWithSQL(paging: PagingDTO, query?: FindSpacesQuery, userId?: string): Promise<PaginationDTO<SpaceDTO>>;
    findSpaces(args?: Prisma.SpaceFindManyArgs): Promise<SpaceDTO[]>;
    findSpaceIsInterested(userId: string, spaceId: string): Promise<InterestedDTO>;
    createInterest(userId: string, spaceId: string): Promise<void>;
    deleteInterest(userId: string, spaceId: string): Promise<void>;
    getExcludeSpaces(query?: FindSpacesQuery): Prisma.Sql[];
}
