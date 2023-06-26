import { FCMProvider } from '@/common/fcm';

import { ClientRevalidateEventProvider } from './client';
import { FCMEventProvider } from './fcm/provider';
import { SchedulerEventProvider } from './scheduler';
export const EventProviders = [ClientRevalidateEventProvider, SchedulerEventProvider, FCMEventProvider];
