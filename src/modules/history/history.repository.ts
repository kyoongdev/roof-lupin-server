import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateHistoryDTO, HistoryDTO } from './dto';

@Injectable()
export class HistoryRepository {
  constructor(private readonly database: PrismaService) {}

  async findHistories(args = {} as Prisma.HistoryFindManyArgs) {
    const histories = await this.database.history.findMany(args);

    return histories.map((history) => new HistoryDTO(history));
  }

  async createHistory(data: CreateHistoryDTO) {
    const history = await this.database.history.create({
      data,
    });
    return history.id;
  }
}
