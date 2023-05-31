import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { CreateQnAAnswerDTO, CreateQnADTO, QnADTO, UpdateQnAAnswerDTO, UpdateQnADTO } from './dto';
import { QNA_ERROR_CODE } from './exception/errorCode';
import { QnAException } from './exception/qna.exception';

@Injectable()
export class QnARepository {
  constructor(private readonly database: PrismaService) {}

  async findQnAs(args = {} as Prisma.SpaceQnAFindManyArgs) {
    const qnas = await this.database.spaceQnA.findMany({
      where: args.where,
      include: {
        answers: {
          include: {
            host: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        user: true,
        space: true,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip: args.skip,
      take: args.take,
    });

    return qnas.map((qna) => new QnADTO(qna));
  }

  async countQna(args = {} as Prisma.SpaceQnACountArgs) {
    return await this.database.spaceQnA.count(args);
  }

  async findQnA(id: string) {
    const qna = await this.database.spaceQnA.findUnique({
      where: {
        id,
      },
      include: {
        space: true,
        answers: {
          include: {
            host: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        user: true,
      },
    });
    if (!qna) {
      throw new QnAException(QNA_ERROR_CODE.NOT_FOUND());
    }

    return new QnADTO(qna);
  }

  async createQnA(userId: string, data: CreateQnADTO) {
    const qna = await this.database.spaceQnA.create({
      data: {
        content: data.content,
        space: {
          connect: {
            id: data.spaceId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return qna.id;
  }

  async updateQnA(id: string, data: UpdateQnADTO) {
    await this.database.spaceQnA.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteQnA(id: string) {
    await this.database.spaceQnA.delete({
      where: {
        id,
      },
    });
  }

  async createQnAAnswer(hostId: string, data: CreateQnAAnswerDTO) {
    const qnaAnswer = await this.database.spaceQnAAnswer.create({
      data: {
        spaceQnA: {
          connect: {
            id: data.qnaId,
          },
        },
        content: data.content,
        host: {
          connect: {
            id: hostId,
          },
        },
      },
    });

    return qnaAnswer.id;
  }

  async updateQnAAnswer(id: string, data: UpdateQnAAnswerDTO) {
    await this.database.spaceQnAAnswer.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteQnAAnswer(id: string) {
    await this.database.spaceQnAAnswer.delete({
      where: {
        id,
      },
    });
  }
}
