import { AlarmTalkEvent } from './alarm-talk/event';
import { AlarmTalkEventProvider } from './alarm-talk/provider';
import { ClientRevalidateEventProvider } from './client';
import { FCMEvent } from './fcm';
import { FCMEventProvider } from './fcm/provider';
import { SchedulerEvent, SchedulerEventProvider } from './scheduler';
export const EventProviders = [
  ClientRevalidateEventProvider,
  SchedulerEventProvider,
  FCMEventProvider,
  AlarmTalkEventProvider,
  AlarmTalkEvent,
  SchedulerEvent,
  FCMEvent,
];
