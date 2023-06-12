import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import scheduler, { type JobCallback } from 'node-schedule';

import { SCHEDULER_EVENT_NAME } from './constants';

@Injectable()
export class SchedulerEventProvider {
  @OnEvent(SCHEDULER_EVENT_NAME.SCHEDULER_CREATE)
  async createSchedule(jobId: string, targetDate: Date, callback: JobCallback) {
    scheduler.scheduleJob(jobId, targetDate, callback);
  }

  @OnEvent(SCHEDULER_EVENT_NAME.SCHEDULER_DELETE)
  async deleteSchedule(jobId: string) {
    scheduler.cancelJob(jobId);
  }

  @OnEvent(SCHEDULER_EVENT_NAME.SCHEDULER_UPDATE)
  async updateSchedule(jobId: string, targetDate: Date, callback: JobCallback) {
    this.deleteSchedule(jobId);
    this.createSchedule(jobId, targetDate, callback);
  }
}
