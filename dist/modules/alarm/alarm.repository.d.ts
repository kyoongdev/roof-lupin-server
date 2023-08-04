import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { AlarmDTO, CreateAlarmDTO, UpdateAlarmDTO } from './dto';
export declare class AlarmRepository {
    private readonly database;
    constructor(database: PrismaService);
    findAlarm(id: string): Promise<AlarmDTO>;
    countAlarms(args?: Prisma.UserAlarmCountArgs): Promise<number>;
    findAlarms(args?: Prisma.UserAlarmFindManyArgs): Promise<AlarmDTO[]>;
    createAlarm(data: CreateAlarmDTO): Promise<string>;
    updateAlarm(id: string, data: UpdateAlarmDTO): Promise<void>;
    deleteAlarm(id: string): Promise<void>;
}
