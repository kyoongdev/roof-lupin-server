import { PagingDTO } from 'cumuco-nestjs';
import { AlarmDTO } from '@/modules/alarm/dto';
import { AlarmResultDTO, AlarmResultsDTO, SendMessageDTO, SendMessagesDTO, SendScheduleMessageDTO, SendScheduleMessagesDTO } from '@/modules/alarm/dto/fcm';
import { AdminAlarmService } from './alarm.service';
export declare class AdminAlarmController {
    private readonly alarmService;
    constructor(alarmService: AdminAlarmService);
    getAlarms(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<AlarmDTO>>;
    getAlarm(id: string): Promise<AlarmDTO>;
    sendAlarm(body: SendMessageDTO): Promise<AlarmResultDTO>;
    sendAlarms(body: SendMessagesDTO): Promise<AlarmResultsDTO>;
    sendScheduleAlarm(body: SendScheduleMessageDTO): Promise<AlarmResultDTO>;
    sendScheduleAlarms(body: SendScheduleMessagesDTO): Promise<AlarmResultsDTO>;
    deleteAlarm(id: string): Promise<void>;
}
