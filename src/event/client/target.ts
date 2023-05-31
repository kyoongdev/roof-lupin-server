import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import axios from 'axios';

import { EVENT_NAME } from './constants';

@Injectable()
export class ClientRevalidateEventTarget {
  @OnEvent(EVENT_NAME.CLIENT_REVALIDATE)
  revalidate(payload: string) {
    axios.get(payload);
  }
}
