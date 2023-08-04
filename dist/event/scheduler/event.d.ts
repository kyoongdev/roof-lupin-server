import { EventEmitter2 } from '@nestjs/event-emitter';
import { type JobCallback } from 'node-schedule';
export declare class SchedulerEvent {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    createSchedule(jobId: string, targetDate: Date, callback: JobCallback): void;
    deleteSchedule(jobId: string): void;
    updateSchedule(jobId: string, targetDate: Date, callback: JobCallback): void;
}
