import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FCMEvent } from '@/event/fcm';
import { AlarmRepository } from '@/modules/alarm/alarm.repository';
import { AlarmDTO } from '@/modules/alarm/dto';
import { AlarmResultDTO, AlarmResultsDTO, SendMessageDTO, SendMessagesDTO, SendScheduleMessageDTO, SendScheduleMessagesDTO } from '@/modules/alarm/dto/fcm';
import { UserRepository } from '@/modules/user/user.repository';
export declare class AdminAlarmService {
    private readonly alarmRepository;
    private readonly userRepository;
    private readonly fcmEvent;
    constructor(alarmRepository: AlarmRepository, userRepository: UserRepository, fcmEvent: FCMEvent);
    sendAlarm(data: SendMessageDTO): Promise<AlarmResultDTO>;
    sendAlarms(data: SendMessagesDTO): Promise<AlarmResultsDTO>;
    sendScheduleAlarm(data: SendScheduleMessageDTO): Promise<AlarmResultDTO>;
    sendScheduleAlarms(data: SendScheduleMessagesDTO): Promise<AlarmResultsDTO>;
    findAlarm(id: string): Promise<AlarmDTO>;
    findPagingAlarms(paging: PagingDTO, args?: Prisma.UserAlarmFindManyArgs): Promise<PaginationDTO<AlarmDTO>>;
    deleteAlarm(id: string): Promise<void>;
}
