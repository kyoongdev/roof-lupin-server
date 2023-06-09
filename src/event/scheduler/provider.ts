import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import scheduler, { type JobCallback } from 'node-schedule';

import { EVENT_NAME } from './constants';

@Injectable()
export class SchedulerEventProvider {
  @OnEvent(EVENT_NAME.SCHEDULER_CREATE)
  async createSchedule(jobId: string, targetDate: Date, callback: JobCallback) {
    console.log({ jobId, targetDate, callback });
    scheduler.scheduleJob(jobId, targetDate, callback);
  }

  @OnEvent(EVENT_NAME.SCHEDULER_DELETE)
  async deleteSchedule(jobId: string) {
    scheduler.cancelJob(jobId);
  }
}
