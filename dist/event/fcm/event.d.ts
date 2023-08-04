import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateCouponDurationAlarm, CreateMarketingAlarm, CreateQnAAnswerAlarm, CreateReservationUsageAlarm, CreateReviewRecommendAlarm, SendAlarm, SendAlarmTarget, SendScheduleAlarm } from '@/interface/fcm.interface';
export declare class FCMEvent {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    sendAlarm(user: SendAlarmTarget, data: SendAlarm): void;
    sendAlarms(users: SendAlarmTarget[], data: SendAlarm): void;
    sendScheduleAlarm(user: SendAlarmTarget, data: SendScheduleAlarm): void;
    sendScheduleAlarms(users: SendAlarmTarget[], data: SendScheduleAlarm): void;
    createReservationUsageAlarm(data: CreateReservationUsageAlarm): void;
    createReviewRecommendAlarm(data: CreateReviewRecommendAlarm): void;
    createCouponDurationAlarm(data: CreateCouponDurationAlarm): void;
    createQnAAnswerAlarm(data: CreateQnAAnswerAlarm): void;
    createMarketingAlarm(data: CreateMarketingAlarm): void;
    deleteAlarm(alarmId: string): void;
}
