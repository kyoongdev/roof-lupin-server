import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { SpaceDetailDTO, SpaceDTO } from '@/modules/space/dto';
import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { RentalTypeDTO, UpdateRentalTypeDTO } from '@/modules/space/dto/rental-type';
import { UpdateSpaceDTO } from '@/modules/space/dto/update-space.dto';
import { FindSpacesQuery } from '../dto/query';
import { HostSpaceService } from './space.service';
export declare class HostSpaceController {
    private readonly spaceService;
    constructor(spaceService: HostSpaceService);
    getSpace(id: string, user: RequestHost): Promise<SpaceDetailDTO>;
    getSpaceRentalTypes(id: string, user: RequestHost): Promise<RentalTypeDTO[]>;
    getSpaces(user: RequestHost, query: FindSpacesQuery, paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<SpaceDTO>>;
    getPagingSpaces(user: RequestHost): Promise<SpaceDTO[]>;
    createSpace(user: RequestHost, body: CreateSpaceDTO): Promise<string>;
    updateSpace(id: string, user: RequestHost, body: UpdateSpaceDTO): Promise<void>;
    updateRentalType(spaceId: string, user: RequestHost, rentalTypeId: string, body: UpdateRentalTypeDTO): Promise<void>;
    deleteSpace(user: RequestHost, id: string): Promise<void>;
    hardDeleteSpace(user: RequestHost, id: string): Promise<void>;
}
