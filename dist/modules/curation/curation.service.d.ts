import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CurationRepository } from './curation.repository';
import { CreateCurationDTO, CurationDTO, UpdateCurationDTO } from './dto';
export declare class CurationService {
    private readonly curationRepository;
    constructor(curationRepository: CurationRepository);
    findCuration(id: string): Promise<import("./dto").CurationDetailDTO>;
    findCurations(args?: Prisma.CurationFindManyArgs): Promise<CurationDTO[]>;
    findPagingCurations(paging: PagingDTO, args?: Prisma.CurationFindManyArgs): Promise<PaginationDTO<CurationDTO>>;
    createCuration(data: CreateCurationDTO, userId?: string): Promise<string>;
    updateCuration(id: string, data: UpdateCurationDTO, userId?: string): Promise<void>;
    deleteCuration(id: string, userId?: string): Promise<void>;
}
