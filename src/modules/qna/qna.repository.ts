import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { QNA_ERROR_CODE } from './exception/errorCode';
import { QnAException } from './exception/qna.exception';

@Injectable()
export class QnARepository {
  constructor(private readonly database: PrismaService) {}

  async findQnAs(args = {} as Prisma.SpaceQnAFindManyArgs) {
    const qnas = await this.database.spaceQnA.findMany(args);

    return qnas;
  }

  async findPagingQnAs(paging: PagingDTO, args = {} as Prisma.SpaceQnAFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.spaceQnA.count({
      where: args.where,
    });
    const rows = await this.database.spaceQnA.findMany({
      where: {
        ...args.where,
      },
      skip,
      take,
    });

    return { count, rows };
  }

  async findQnA(id: string) {
    const qna = await this.database.spaceQnA.findUnique({
      where: {
        id,
      },
    });
    if (!qna) {
      throw new QnAException(QNA_ERROR_CODE.NOT_FOUND);
    }

    return qna;
  }

  async findQnAsWithSpaceId(spaceId: string) {
    const qnas = await this.database.spaceQnA.findMany({
      where: {
        spaceId,
      },
    });

    return qnas;
  }

  async findPagingQnAsWithSpaceId(paging: PagingDTO, spaceId: string) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.spaceQnA.count({
      where: {
        spaceId,
      },
    });
    const rows = await this.database.spaceQnA.findMany({
      where: {
        spaceId,
      },
      skip,
      take,
    });

    return { count, rows };
  }
}
