import { PagingDTO } from 'cumuco-nestjs';
import { CreateExhibitionDTO, CreateExhibitionSpaceDTO, ExhibitionDetailDTO, ExhibitionDTO, UpdateExhibitionDTO, UpdateExhibitionOrderDTO, UpdateExhibitionSpaceDTO } from '@/modules/exhibition/dto';
import { FindExhibitionsQuery } from '@/modules/exhibition/dto/query';
import { AdminExhibitionService } from './exhibition.service';
export declare class AdminExhibitionController {
    private readonly exhibitionService;
    constructor(exhibitionService: AdminExhibitionService);
    getExhibition(id: string): Promise<ExhibitionDetailDTO>;
    getPagingExhibitions(paging: PagingDTO, query: FindExhibitionsQuery): Promise<import("cumuco-nestjs").PaginationDTO<ExhibitionDTO>>;
    createExhibition(body: CreateExhibitionDTO): Promise<string>;
    createExhibitionSpace(id: string, body: CreateExhibitionSpaceDTO): Promise<void>;
    updateExhibition(id: string, body: UpdateExhibitionDTO): Promise<void>;
    updateExhibitionOrder(id: string, body: UpdateExhibitionOrderDTO): Promise<void>;
    updateExhibitionSpace(id: string, body: UpdateExhibitionSpaceDTO): Promise<void>;
    deleteExhibition(id: string): Promise<void>;
    deleteExhibitionOrder(id: string): Promise<void>;
    deleteExhibitionSpace(id: string, spaceId: string): Promise<void>;
}
