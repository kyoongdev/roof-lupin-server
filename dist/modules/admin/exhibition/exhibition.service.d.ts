import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { CreateExhibitionDTO, CreateExhibitionSpaceDTO, ExhibitionDTO, UpdateExhibitionDTO, UpdateExhibitionOrderDTO, UpdateExhibitionSpaceDTO } from '@/modules/exhibition/dto';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { FileService } from '@/modules/file/file.service';
export declare class AdminExhibitionService {
    private readonly exhibitionRepository;
    private readonly fileService;
    private readonly fcmEvent;
    private readonly database;
    constructor(exhibitionRepository: ExhibitionRepository, fileService: FileService, fcmEvent: FCMEvent, database: PrismaService);
    findExhibition(id: string): Promise<import("@/modules/exhibition/dto").ExhibitionDetailDTO>;
    findPagingExhibitions(paging: PagingDTO, args?: Prisma.ExhibitionFindManyArgs): Promise<PaginationDTO<ExhibitionDTO>>;
    createExhibition(data: CreateExhibitionDTO): Promise<string>;
    createExhibitionSpace(id: string, data: CreateExhibitionSpaceDTO): Promise<void>;
    updateExhibition(id: string, data: UpdateExhibitionDTO): Promise<void>;
    updateExhibitionOrder(id: string, data: UpdateExhibitionOrderDTO): Promise<void>;
    updateExhibitionSpace(id: string, data: UpdateExhibitionSpaceDTO): Promise<void>;
    deleteExhibition(id: string): Promise<void>;
    deleteExhibitionOrder(id: string): Promise<void>;
    deleteExhibitionSpace(id: string, spaceId: string): Promise<void>;
}
