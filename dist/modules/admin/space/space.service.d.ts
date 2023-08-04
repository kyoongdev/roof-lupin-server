import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { SpaceDTO, UpdateSpaceDTO } from '@/modules/space/dto';
import { SpaceRepository } from '@/modules/space/space.repository';
import { AdminFindSpacesQuery } from '../dto/query/space';
import { SpaceCountDTO, UpdateSpaceOrderDTO } from '../dto/space';
export declare class AdminSpaceService {
    private readonly spaceRepository;
    constructor(spaceRepository: SpaceRepository);
    findSpace(id: string): Promise<import("@/modules/space/dto").SpaceDetailDTO>;
    findSpaceIds(): Promise<import("@/modules/space/dto").SpaceIdsDTO[]>;
    countSpaces(): Promise<SpaceCountDTO>;
    findPagingSpaces(paging: PagingDTO, query: AdminFindSpacesQuery): Promise<PaginationDTO<SpaceDTO>>;
    updateSpace(id: string, data: UpdateSpaceDTO): Promise<void>;
    updateSpaceOrder(id: string, data: UpdateSpaceOrderDTO): Promise<void>;
    deleteSpaceOrder(id: string): Promise<void>;
    deleteSpace(id: string): Promise<void>;
}
