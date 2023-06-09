import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { AlarmRepository } from '@/modules/alarm/alarm.repository';
import { AlarmDTO, CreateAlarmDTO, UpdateAlarmDTO } from '@/modules/alarm/dto';

@Injectable()
export class AdminAlarmService {
  constructor(private readonly alarmRepository: AlarmRepository) {}

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
    return await this.alarmRepository.createAlarm(data);
  }

  async updateAlarm(id: string, data: UpdateAlarmDTO) {
    return await this.alarmRepository.updateAlarm(id, data);
  }

  async deleteAlarm(id: string) {
    await this.alarmRepository.deleteAlarm(id);
  }
}
