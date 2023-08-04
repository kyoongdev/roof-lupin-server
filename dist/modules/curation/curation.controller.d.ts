import { PagingDTO } from 'cumuco-nestjs';
import { CurationService } from './curation.service';
import { CreateCurationDTO, CurationDetailDTO, CurationDTO, UpdateCurationDTO } from './dto';
export declare class CurationController {
    private readonly curationService;
    constructor(curationService: CurationService);
    getCurationDetail(id: string): Promise<CurationDetailDTO>;
    getPagingCuration(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<CurationDTO>>;
    createCuration(body: CreateCurationDTO): Promise<string>;
    updateCuration(id: string, body: UpdateCurationDTO): Promise<void>;
    deleteCuration(id: string): Promise<void>;
}
