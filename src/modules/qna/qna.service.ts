import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { HistoryRepository } from '../history/history.repository';

import { CreateQnADTO, QnACountDTO, QnACountSummaryDTO, QnADTO, UpdateQnADTO } from './dto';
import { QNA_ERROR_CODE, QNA_MUTATION_FORBIDDEN, QNA_READ_FORBIDDEN } from './exception/errorCode';
import { QnAException } from './exception/qna.exception';
import { QnARepository } from './qna.repository';

@Injectable()
export class QnAService {
  constructor(private readonly qnaRepository: QnARepository, private readonly historyRepository: HistoryRepository) {}

  async countQnASummary(userId: string) {
    const notAnsweredCount = await this.qnaRepository.countQna({
      where: {
        userId,
        answers: {
          none: {},
        },
        deletedAt: null,
      },
    });

    const answeredCount = await this.qnaRepository.countQna({
      where: {
        userId,
        answers: {
          some: {},
        },
        deletedAt: null,
      },
    });
    return new QnACountSummaryDTO({ notAnsweredCount, answeredCount });
  }

  async countTotalQnA(userId: string) {
    const count = await this.qnaRepository.countQna({
      where: {
        userId,
        deletedAt: null,
      },
    });

    return new QnACountDTO({ count });
  }

  async findQnA(id: string, userId: string) {
    const qna = await this.qnaRepository.findQnA(id);

    if (qna.user.id !== userId) {
      throw new QnAException(QNA_ERROR_CODE.FORBIDDEN(QNA_READ_FORBIDDEN));
    }

    return qna;
  }

  async findPagingQnAs(paging: PagingDTO, args = {} as Prisma.SpaceQnAFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.qnaRepository.countQna({
      where: {
        ...args.where,
        deletedAt: null,
        user: {
          deletedAt: null,
        },
      },
    });
    const qnas = await this.qnaRepository.findQnAs({
      where: {
        ...args.where,
        deletedAt: null,
        user: {
          deletedAt: null,
        },
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip,
      take,
    });
    return new PaginationDTO<QnADTO>(qnas, { count, paging });
  }

  async findQnAs(args = {} as Prisma.SpaceQnAFindManyArgs) {
    return await this.qnaRepository.findQnAs({
      where: {
        ...args.where,
        deletedAt: null,
        user: {
          deletedAt: null,
        },
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    });
  }

  async createQnA(userId: string, data: CreateQnADTO) {
    return await this.qnaRepository.createQnA(userId, data);
  }

  async updateQnA(qnaId: string, userId: string, data: UpdateQnADTO) {
    const qna = await this.qnaRepository.findQnA(qnaId);

    this.checkIsUserValid(qna, userId);

    await this.historyRepository.createHistory({
      content: qna.content,
      writtenAt: qna.createdAt,
      spaceQnAId: qna.id,
    });
    await this.qnaRepository.updateQnA(qnaId, data);
  }

  async deleteQnA(qnaId: string, userId: string) {
    const qna = await this.qnaRepository.findQnA(qnaId);
    this.checkIsUserValid(qna, userId);

    await this.qnaRepository.deleteQnA(qnaId);
  }

  checkIsUserValid(qna: QnADTO, userId: string) {
    if (qna.user.id !== userId) {
      throw new QnAException(QNA_ERROR_CODE.FORBIDDEN(QNA_MUTATION_FORBIDDEN));
    }
  }
}
