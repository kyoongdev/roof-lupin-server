import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';

import { BlockedTimeException } from './exception/blocked-time';
import { BLOCKED_TIME_ERROR_CODE, BLOCKED_TIME_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class BlockedTimeRepository {
  constructor(private readonly database: PrismaService) {}

  async findBlockedTime(id: string) {
    const blockedTime = await this.database.blockedTime.findUnique({
      where: {
        id,
      },
    });
    if (!blockedTime) {
      throw new BlockedTimeException(BLOCKED_TIME_ERROR_CODE.NOT_FOUND(BLOCKED_TIME_NOT_FOUND));
    }
    return new BlockedTimeDTO(blockedTime);
  }

  async countBlockedTimes(args = {} as Prisma.BlockedTimeCountArgs) {
    return await this.database.blockedTime.count({
      where: args.where,
    });
  }

  async findBlockedTimes(args = {} as Prisma.BlockedTimeFindManyArgs) {
    const blockedTimes = await this.database.blockedTime.findMany(args);
    return blockedTimes.map((blockedTime) => new BlockedTimeDTO(blockedTime));
  }

  async createBlockedTime(data: CreateBlockedTimeDTO) {
    const blockedTime = await this.database.blockedTime.create({
      data,
    });
    return blockedTime;
  }

  async updateBlockedTime(id: string, data: UpdateBlockedTimeDTO) {
    await this.database.blockedTime.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteBlockedTime(id: string) {
    await this.database.blockedTime.delete({
      where: {
        id,
      },
    });
  }
}
