import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import axios from 'axios';

import { CLIENT_EVENT_NAME } from './constants';

@Injectable()
export class ClientRevalidateEventProvider {
  @OnEvent(CLIENT_EVENT_NAME.CLIENT_REVALIDATE)
  revalidate(payload: string) {
    axios.get(payload);
  }
}
