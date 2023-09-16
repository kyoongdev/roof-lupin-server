import { AlarmTalkEvent } from './alarm-talk/event';
import { AlarmTalkEventProvider } from './alarm-talk/provider';
import { ClientRevalidateEventProvider } from './client';
import { MessageEvent } from './message';
import { MessageEventProvider } from './message/provider';
import { SchedulerEvent, SchedulerEventProvider } from './scheduler';
export const EventProviders = [
  ClientRevalidateEventProvider,
  SchedulerEventProvider,
  MessageEventProvider,
  AlarmTalkEventProvider,
  AlarmTalkEvent,
  SchedulerEvent,
  MessageEvent,
];
