import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { AlarmService } from './alarm.service';
import { AlarmDTO } from './dto';
export declare class AlarmController {
    private readonly alarmService;
    constructor(alarmService: AlarmService);
    getAlarm(id: string): Promise<AlarmDTO>;
    getAlarms(paging: PagingDTO, user: RequestUser): Promise<import("cumuco-nestjs").PaginationDTO<AlarmDTO>>;
    readAlarm(id: string, user: RequestUser): Promise<void>;
    deleteAlarm(id: string, user: RequestUser): Promise<void>;
}
