import { PagingDTO } from 'cumuco-nestjs';
import { SpaceDetailDTO, SpaceDTO, SpaceIdsDTO, UpdateSpaceDTO } from '@/modules/space/dto';
import { AdminFindSpacesQuery } from '../dto/query/space';
import { SpaceCountDTO, UpdateSpaceOrderDTO } from '../dto/space';
import { AdminSpaceService } from './space.service';
export declare class AdminSpaceController {
    private readonly spaceService;
    constructor(spaceService: AdminSpaceService);
    getSpaceIds(): Promise<SpaceIdsDTO[]>;
    countSpaces(): Promise<SpaceCountDTO>;
    getSpaces(paging: PagingDTO, query: AdminFindSpacesQuery): Promise<import("cumuco-nestjs").PaginationDTO<SpaceDTO>>;
    getSpace(id: string): Promise<SpaceDetailDTO>;
    updateSpace(id: string, body: UpdateSpaceDTO): Promise<void>;
    updateSpaceOrder(id: string, body: UpdateSpaceOrderDTO): Promise<void>;
    deleteSpaceOrder(id: string): Promise<void>;
    deleteSpace(id: string): Promise<void>;
}
