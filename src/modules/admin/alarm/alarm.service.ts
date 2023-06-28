import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { FCMEvent } from '@/event/fcm';
import { AlarmRepository } from '@/modules/alarm/alarm.repository';
import { AlarmDTO } from '@/modules/alarm/dto';
import {
  AlarmResultDTO,
  AlarmResultsDTO,
  SendMessageDTO,
  SendMessagesDTO,
  SendScheduleMessageDTO,
  SendScheduleMessagesDTO,
} from '@/modules/alarm/dto/fcm';
import { AlarmException } from '@/modules/alarm/exception/alarm.exception';
import { ALARM_ERROR_CODE, ALARM_PUSH_TOKEN_NOT_FOUND } from '@/modules/alarm/exception/errorCode';
import { UserRepository } from '@/modules/user/user.repository';

@Injectable()
export class AdminAlarmService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly userRepository: UserRepository,
    private readonly fcmEvent: FCMEvent
  ) {}

  async sendAlarm(data: SendMessageDTO) {
    const { userId, message } = data;
    const { pushToken } = await this.userRepository.findUserPushToken(data.userId);

    if (!pushToken) {
      throw new AlarmException(ALARM_ERROR_CODE.NOT_FOUND(ALARM_PUSH_TOKEN_NOT_FOUND));
    }
    this.fcmEvent.sendAlarm(
      {
        pushToken,
        userId,
      },
      message
    );
    return new AlarmResultDTO({ userId });
  }

  async sendAlarms(data: SendMessagesDTO) {
    const { userIds, message } = data;
    const users = await Promise.all(
      userIds
        .map(async (userId) => {
          const { pushToken } = await this.userRepository.findUserPushToken(userId);
          if (!pushToken) {
            return null;
          }
          return {
            pushToken,
            userId,
          };
        })
        .filter(Boolean)
    );

    users.forEach((user) => this.fcmEvent.sendAlarm(user, message));

    return new AlarmResultsDTO({ userIds });
  }

  async sendScheduleAlarm(data: SendScheduleMessageDTO) {
    const { userId, message } = data;
    const { pushToken } = await this.userRepository.findUserPushToken(data.userId);

    if (!pushToken) {
      throw new AlarmException(ALARM_ERROR_CODE.NOT_FOUND(ALARM_PUSH_TOKEN_NOT_FOUND));
    }

    this.fcmEvent.sendScheduleAlarm({ pushToken, userId }, message);
    return new AlarmResultDTO({ userId });
  }

  async sendScheduleAlarms(data: SendScheduleMessagesDTO) {
    const { userIds, message } = data;
    const users = await Promise.all(
      userIds
        .map(async (userId) => {
          const { pushToken } = await this.userRepository.findUserPushToken(userId);
          if (!pushToken) {
            return null;
          }
          return {
            pushToken,
            userId,
          };
        })
        .filter(Boolean)
    );

    users.forEach((user) => this.fcmEvent.sendScheduleAlarm(user, message));
    return new AlarmResultsDTO({ userIds });
  }

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

  async deleteAlarm(id: string) {
    this.fcmEvent.deleteAlarm(id);
    await this.alarmRepository.deleteAlarm(id);
  }
}
