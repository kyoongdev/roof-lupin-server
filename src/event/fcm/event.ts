import { Injectable } from '@nestjs/common';

import { JobCallback } from 'node-schedule';
import { EventEmitter } from 'stream';

import { CreateReservationUsageAlarm } from '@/interface/fcm.interface';

import { FCM_EVENT_NAME } from './constants';

@Injectable()
export class FCMEvent {
  constructor(private readonly eventEmitter: EventEmitter) {}

  createReservationUsageAlarm(jobId: string, data: CreateReservationUsageAlarm, callback: JobCallback) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM, jobId, data, callback);
  }
}
