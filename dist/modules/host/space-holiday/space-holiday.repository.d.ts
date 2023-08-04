import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateSpaceHolidayDTO, SpaceHolidayDTO, UpdateSpaceHolidayDTO } from '@/modules/space/dto/holiday';
export declare class SpaceHolidayRepository {
    private readonly database;
    constructor(database: PrismaService);
    findSpaceHoliday(id: string): Promise<SpaceHolidayDTO>;
    countSpaceHolidays(args?: Prisma.SpaceHolidayCountArgs): Promise<number>;
    findSpaceHolidays(args?: Prisma.SpaceHolidayFindManyArgs): Promise<SpaceHolidayDTO[]>;
    findSpaceHolidayBySpaceId(spaceId: string): Promise<SpaceHolidayDTO>;
    createSpaceHoliday(spaceId: string, data: CreateSpaceHolidayDTO): Promise<string>;
    updateSpaceHoliday(id: string, data: UpdateSpaceHolidayDTO): Promise<void>;
    deleteSpaceHoliday(id: string): Promise<void>;
}
