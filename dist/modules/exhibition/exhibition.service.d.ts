import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ExhibitionDTO } from './dto';
import { ExhibitionRepository } from './exhibition.repository';
export declare class ExhibitionService {
    private readonly exhibitionRepository;
    constructor(exhibitionRepository: ExhibitionRepository);
    findExhibition(id: string, userId?: string): Promise<import("./dto").ExhibitionDetailDTO>;
    findPagingExhibitions(paging: PagingDTO, args?: Prisma.ExhibitionFindManyArgs): Promise<PaginationDTO<ExhibitionDTO>>;
}
