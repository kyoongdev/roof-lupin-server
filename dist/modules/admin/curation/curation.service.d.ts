import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CurationRepository } from '@/modules/curation/curation.repository';
import { CreateCurationSpaceDTO, CurationDTO } from '@/modules/curation/dto';
import { UpdateCurationSpaceDTO } from '@/modules/curation/dto/update-curation-space.dto';
import { AdminCreateCurationDTO, AdminUpdateCurationDTO, CurationCountDTO } from '../dto/curation';
export declare class AdminCurationService {
    private readonly curationRepository;
    constructor(curationRepository: CurationRepository);
    countCurations(): Promise<CurationCountDTO>;
    findCuration(id: string): Promise<import("@/modules/curation/dto").CurationDetailDTO>;
    findPagingCurations(paging: PagingDTO, args?: Prisma.CurationFindManyArgs): Promise<PaginationDTO<CurationDTO>>;
    createCuration(data: AdminCreateCurationDTO): Promise<string>;
    createCurationSpace(curationId: string, data: CreateCurationSpaceDTO): Promise<void>;
    updateCuration(id: string, data: AdminUpdateCurationDTO): Promise<void>;
    updateCurationSpace(curationId: string, data: UpdateCurationSpaceDTO): Promise<void>;
    updateCurationOrder(curation: string, orderNo: number): Promise<void>;
    deleteCuration(id: string): Promise<void>;
    deleteCurationSpace(curationId: string, spaceId: string): Promise<void>;
}
