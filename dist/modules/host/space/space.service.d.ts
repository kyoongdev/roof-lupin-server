import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FileService } from '@/modules/file/file.service';
import { SpaceDTO } from '@/modules/space/dto';
import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { UpdateRentalTypeDTO } from '@/modules/space/dto/rental-type';
import { UpdateSpaceDTO } from '@/modules/space/dto/update-space.dto';
import { RentalTypeRepository } from '@/modules/space/rental-type/rental-type.repository';
import { SpaceRepository } from '@/modules/space/space.repository';
export declare class HostSpaceService {
    private readonly spaceRepository;
    private readonly rentalTypeRepository;
    private readonly fileService;
    constructor(spaceRepository: SpaceRepository, rentalTypeRepository: RentalTypeRepository, fileService: FileService);
    findSpace(id: string, hostId: string): Promise<import("@/modules/space/dto").SpaceDetailDTO>;
    findPagingSpaces(paging: PagingDTO, hostId: string, args?: Prisma.SpaceFindManyArgs): Promise<PaginationDTO<SpaceDTO>>;
    findSpaces(hostId: string, args?: Prisma.SpaceFindManyArgs): Promise<SpaceDTO[]>;
    findSpaceRentalType(spaceId: string, hostId: string): Promise<import("@/modules/space/dto/rental-type").RentalTypeDTO[]>;
    createSpace(hostId: string, data: CreateSpaceDTO): Promise<string>;
    updateRentalType(spaceId: string, rentalTypeId: string, hostId: string, data: UpdateRentalTypeDTO): Promise<void>;
    updateSpace(id: string, hostId: string, data: UpdateSpaceDTO): Promise<void>;
    deleteSpace(id: string, hostId: string): Promise<void>;
    hardDeleteSpace(id: string, hostId: string): Promise<void>;
}
