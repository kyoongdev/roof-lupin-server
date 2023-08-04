import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { ExhibitionDetailDTO, ExhibitionDTO } from './dto';
import { ExhibitionService } from './exhibition.service';
export declare class ExhibitionController {
    private readonly exhibitionService;
    constructor(exhibitionService: ExhibitionService);
    getExhibition(id: string, user?: RequestUser): Promise<ExhibitionDetailDTO>;
    getExhibitions(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<ExhibitionDTO>>;
}
