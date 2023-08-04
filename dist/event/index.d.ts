import { ClientRevalidateEventProvider } from './client';
import { FCMEventProvider } from './fcm/provider';
import { SchedulerEventProvider } from './scheduler';
export declare const EventProviders: (typeof SchedulerEventProvider | typeof FCMEventProvider | typeof ClientRevalidateEventProvider)[];
