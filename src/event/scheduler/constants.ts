export const SCHEDULER_EVENT_NAME = {
  SCHEDULER_CREATE: Symbol('scheduler.create'),
  SCHEDULER_CREATE_BULK: Symbol('scheduler.create.bulk'),
  SCHEDULER_DELETE: Symbol('scheduler.update'),
  SCHEDULER_UPDATE: Symbol('scheduler.update.bulk'),
} as const;
