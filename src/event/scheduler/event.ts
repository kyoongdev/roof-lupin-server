import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { type JobCallback } from 'node-schedule';

import { EVENT_NAME } from './constants';

@Injectable()
export class SchedulerEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  createSchedule(jobId: string, targetDate: Date, callback: JobCallback) {
    this.eventEmitter.emit(EVENT_NAME.SCHEDULER_CREATE, jobId, targetDate, callback);
  }

  deleteSchedule(jobId: string) {
    this.eventEmitter.emit(EVENT_NAME.SCHEDULER_DELETE, jobId);
  }
}
