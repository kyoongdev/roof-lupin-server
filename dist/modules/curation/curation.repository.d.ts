import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateCurationDTO, CreateCurationSpaceDTO, CurationDetailDTO, CurationDTO, UpdateCurationDTO } from './dto';
import { UpdateCurationSpaceDTO } from './dto/update-curation-space.dto';
export declare class CurationRepository {
    private readonly database;
    constructor(database: PrismaService);
    checkCurationSpace(curationId: string, spaceId: string): Promise<import(".prisma/client").CurationSpace>;
    findCuration(id: string): Promise<CurationDetailDTO>;
    findCurations(args?: Prisma.CurationFindManyArgs): Promise<CurationDTO[]>;
    countCurations(args?: Prisma.CurationCountArgs): Promise<number>;
    createCuration(data: CreateCurationDTO, userId?: string): Promise<string>;
    updateCuration(id: string, data: UpdateCurationDTO): Promise<void>;
    createCurationSpace(curationId: string, data: CreateCurationSpaceDTO): Promise<void>;
    updateCurationSpace(id: string, data: UpdateCurationSpaceDTO): Promise<void>;
    updateCurationOrder(id: string, orderNo: number): Promise<void>;
    deleteCuration(id: string): Promise<void>;
    deleteCurationSpace(curationId: string, spaceId: string): Promise<void>;
}
