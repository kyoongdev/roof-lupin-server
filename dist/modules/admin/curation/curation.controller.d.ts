import { PagingDTO } from 'cumuco-nestjs';
import { CreateCurationSpaceDTO, CurationDetailDTO, CurationDTO } from '@/modules/curation/dto';
import { FindCurationsQuery } from '@/modules/curation/dto/query';
import { UpdateCurationSpaceDTO } from '@/modules/curation/dto/update-curation-space.dto';
import { AdminCreateCurationDTO, AdminUpdateCurationDTO, AdminUpdateCurationOrderDTO, CurationCountDTO } from '../dto/curation';
import { AdminCurationService } from './curation.service';
export declare class AdminCurationController {
    private readonly curationService;
    constructor(curationService: AdminCurationService);
    getCuration(id: string): Promise<CurationDetailDTO>;
    getCurations(paging: PagingDTO, query: FindCurationsQuery): Promise<import("cumuco-nestjs").PaginationDTO<CurationDTO>>;
    countCurations(): Promise<CurationCountDTO>;
    createCuration(body: AdminCreateCurationDTO): Promise<string>;
    createCurationSpace(id: string, body: CreateCurationSpaceDTO): Promise<void>;
    updateCuration(id: string, data: AdminUpdateCurationDTO): Promise<void>;
    updateCurationSpace(id: string, data: UpdateCurationSpaceDTO): Promise<void>;
    updateCurationOrder(id: string, data: AdminUpdateCurationOrderDTO): Promise<void>;
    deleteCuration(id: string): Promise<void>;
    deleteCurationSpace(curationId: string, spaceId: string): Promise<void>;
}
