import { PrismaService } from '@/database/prisma.service';
import { HolidayDTO } from './dto';
export declare class HolidayService {
    private readonly database;
    constructor(database: PrismaService);
    findHoliday(year: string, month: string): Promise<HolidayDTO[]>;
    checkIsHoliday(year: string, month: string, day: string): Promise<boolean>;
}
