import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { SchedulerEvent } from '@/event/scheduler';
import { AlarmRepository } from '@/modules/alarm/alarm.repository';
import { AlarmDTO, CreateAlarmDTO, UpdateAlarmDTO } from '@/modules/alarm/dto';

@Injectable()
export class AdminAlarmService {
  constructor(private readonly alarmRepository: AlarmRepository, private readonly schedulerEvent: SchedulerEvent) {}

  async findAlarm(id: string) {
    return await this.alarmRepository.findAlarm(id);
  }

  async findPagingAlarms(paging: PagingDTO, args = {} as Prisma.UserAlarmFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.alarmRepository.countAlarms({
      where: args.where,
    });
    const alarms = await this.alarmRepository.findAlarms({
      ...args,
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<AlarmDTO>(alarms, { count, paging });
  }

  async createAlarm(data: CreateAlarmDTO) {
    const alarmId = await this.alarmRepository.createAlarm(data);
    const alarmAt = new Date(data.alarmAt);
    alarmAt.setSeconds(alarmAt.getSeconds() + 5);
    this.schedulerEvent.createSchedule(alarmId, alarmAt, () => {
      console.log('띵동');
    });

    return alarmId;
  }

  async updateAlarm(id: string, data: UpdateAlarmDTO) {
    const alarmAt = new Date(data.alarmAt);
    alarmAt.setSeconds(alarmAt.getSeconds() + 5);
    this.schedulerEvent.updateSchedule(id, alarmAt, () => {
      console.log('띵동');
    });

    return await this.alarmRepository.updateAlarm(id, data);
  }

  async deleteAlarm(id: string) {
    this.schedulerEvent.deleteSchedule(id);
    await this.alarmRepository.deleteAlarm(id);
  }
}
