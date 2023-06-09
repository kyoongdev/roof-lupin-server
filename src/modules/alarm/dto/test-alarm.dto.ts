import { Property } from 'wemacu-nestjs';

export class TestAlarmDTO {
  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  alarmAt: string;
}