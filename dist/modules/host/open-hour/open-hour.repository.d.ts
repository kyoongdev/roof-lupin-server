import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateOpenHourDTO, OpenHourDTO, UpdateOpenHourDTO } from '../dto/openHour';
export declare class OpenHourRepository {
    private readonly database;
    constructor(database: PrismaService);
    countOpenHours(args?: Prisma.OpenHourCountArgs): Promise<number>;
    findOpenHours(args?: Prisma.OpenHourFindManyArgs): Promise<OpenHourDTO[]>;
    createOpenHour(spaceId: string, data: CreateOpenHourDTO): Promise<string>;
    updateOpenHour(id: string, data: UpdateOpenHourDTO): Promise<void>;
    deleteOpenHour(id: string): Promise<void>;
}
