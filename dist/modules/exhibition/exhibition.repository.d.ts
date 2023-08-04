import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateExhibitionDTO, CreateExhibitionSpaceDTO, ExhibitionDetailDTO, ExhibitionDTO, UpdateExhibitionDTO, UpdateExhibitionOrderDTO, UpdateExhibitionSpaceDTO } from './dto';
export declare class ExhibitionRepository {
    private readonly database;
    constructor(database: PrismaService);
    findExhibition(id: string, userId?: string): Promise<ExhibitionDetailDTO>;
    countExhibitions(args: Prisma.ExhibitionCountArgs): Promise<number>;
    findExhibitions(args: Prisma.ExhibitionFindManyArgs): Promise<ExhibitionDTO[]>;
    createExhibition(data: CreateExhibitionDTO): Promise<string>;
    createExhibitionSpace(exhibitionId: string, data: CreateExhibitionSpaceDTO): Promise<void>;
    updateExhibition(id: string, data: UpdateExhibitionDTO): Promise<void>;
    updateExhibitionOrder(id: string, data: UpdateExhibitionOrderDTO): Promise<void>;
    updateExhibitionSpace(id: string, data: UpdateExhibitionSpaceDTO): Promise<void>;
    deleteExhibition(id: string): Promise<void>;
    deleteExhibitionOrder(id: string): Promise<void>;
    deleteExhibitionSpace(id: string, spaceId: string): Promise<void>;
}
