import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { AlarmRepository } from './alarm.repository';
import { AlarmDTO } from './dto';
export declare class AlarmService {
    private readonly alarmRepository;
    constructor(alarmRepository: AlarmRepository);
    findAlarm(id: string): Promise<AlarmDTO>;
    findPagingAlarms(paging: PagingDTO, args?: Prisma.UserAlarmFindManyArgs): Promise<PaginationDTO<AlarmDTO>>;
    readAlarm(id: string, userId: string): Promise<void>;
    deleteAlarm(id: string, userId: string): Promise<void>;
}
