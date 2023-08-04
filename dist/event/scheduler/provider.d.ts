import { type JobCallback } from 'node-schedule';
export declare class SchedulerEventProvider {
    createSchedule(jobId: string, targetDate: Date, callback: JobCallback): Promise<void>;
    deleteSchedule(jobId: string): Promise<void>;
    updateSchedule(jobId: string, targetDate: Date, callback: JobCallback): Promise<void>;
}
