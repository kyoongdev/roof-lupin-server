import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import { CreateQnAAnswerDTO, CreateQnADTO, QnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO, UpdateQnADTO } from './dto';
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
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
        space: {
          include: SpaceDTO.generateSpaceInclude(),
        },
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip: args.skip,
      take: args.take,
    });

    return qnas.map(
      (qna) =>
        new QnADTO({
          ...qna,
          answer: qna.answers.filter((answer) => !answer.deletedAt).at(-1),
          space: SpaceDTO.generateSpaceDTO(qna.space),
        })
    );
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
        space: {
          include: SpaceDTO.generateSpaceInclude(),
        },
        answers: {
          include: {
            host: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
    });
    if (!qna) {
      throw new QnAException(QNA_ERROR_CODE.NOT_FOUND());
    }

    return new QnADTO({
      ...qna,
      answer: qna.answers.filter((answer) => !answer.deletedAt).at(-1),
      space: SpaceDTO.generateSpaceDTO(qna.space),
    });
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
    await this.database.spaceQnA.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteQnA(id: string) {
    await this.database.spaceQnA.delete({
      where: {
        id,
      },
    });
  }

  async findQnAAnswer(id: string) {
    const qnaAnswer = await this.database.spaceQnAAnswer.findUnique({
      where: {
        id,
      },
      include: {
        host: true,
      },
    });
    if (!qnaAnswer) {
      throw new QnAException(QNA_ERROR_CODE.NOT_FOUND());
    }

    return new QnAAnswerDTO(qnaAnswer);
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
    await this.database.spaceQnAAnswer.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteQnAAnswer(id: string) {
    await this.database.spaceQnAAnswer.delete({
      where: {
        id,
      },
    });
  }
}
