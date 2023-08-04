import { PrismaService } from '@/database/prisma.service';
import { CreateCouponDurationAlarm, CreateMarketingAlarm, CreateQnAAnswerAlarm, CreateReservationUsageAlarm, CreateReviewRecommendAlarm, SendAlarm, SendAlarmTarget, SendPushMessage, SendScheduleAlarm } from '@/interface/fcm.interface';
import { CreateAlarmDTO } from '@/modules/alarm/dto';
import { FCMProvider } from '@/utils/fcm';
import { SchedulerEvent } from '../scheduler';
export declare class FCMEventProvider {
    private readonly database;
    private readonly fcmService;
    private schedulerEvent;
    constructor(database: PrismaService, fcmService: FCMProvider, schedulerEvent: SchedulerEvent);
    sendAlarm(user: SendAlarmTarget, data: SendAlarm): Promise<void>;
    sendAlarms(users: SendAlarmTarget[], data: SendAlarm): Promise<void>;
    sendScheduleAlarm(user: SendAlarmTarget, data: SendScheduleAlarm): Promise<void>;
    sendScheduleAlarms(users: SendAlarmTarget[], data: SendScheduleAlarm): Promise<void>;
    createReservationUsageAlarm(data: CreateReservationUsageAlarm): Promise<void>;
    createReviewRecommendAlarm(data: CreateReviewRecommendAlarm): Promise<void>;
    createCouponDurationAlarm(data: CreateCouponDurationAlarm): Promise<void>;
    createQnAAnswerAlarm(data: CreateQnAAnswerAlarm): Promise<void>;
    createMarketIngAlarm(data: CreateMarketingAlarm): Promise<void>;
    deleteAlarm(jobId: string): Promise<void>;
    sendAlarmWithUpdate(alarmId: string, data: SendPushMessage): Promise<void>;
    createAlarm(data: CreateAlarmDTO): Promise<import(".prisma/client").UserAlarm>;
    updatePushedAlarm(id: string): Promise<void>;
}
