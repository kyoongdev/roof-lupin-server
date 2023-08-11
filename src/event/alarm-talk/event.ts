import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AlarmTalkVariable } from '@/interface/alarm-talk.interface';

import { ALARM_TALK_EVENT_NAME, ALARM_TALK_TEMPLATE } from './constants';

@Injectable()
export class AlarmTalkEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  sendMessage<T>(
    targetPhoneNumber: string,
    templateIdKey: keyof typeof ALARM_TALK_TEMPLATE,
    variables?: AlarmTalkVariable<T>
  ) {
    this.eventEmitter.emit(
      ALARM_TALK_EVENT_NAME.SEND_MESSAGE,
      targetPhoneNumber,
      ALARM_TALK_TEMPLATE[templateIdKey],
      variables
    );
  }
}
