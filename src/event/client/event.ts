import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CLIENT_END_POINT, CLIENT_EVENT_NAME } from './constants';

@Injectable()
export class ClientRevalidateEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  revalidateClient() {
    this.eventEmitter.emit(CLIENT_EVENT_NAME.CLIENT_REVALIDATE, CLIENT_END_POINT.TEST_URL);
  }
}
