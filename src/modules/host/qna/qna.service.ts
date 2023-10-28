import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { getTimeDiff } from '@/common/date';
import { PrismaService } from '@/database/prisma.service';
import { MessageEvent } from '@/event/message';
import { HistoryRepository } from '@/modules/history/history.repository';
import { CreateQnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO } from '@/modules/qna/dto';
import { QNA_ERROR_CODE } from '@/modules/qna/exception/errorCode';
import { QnAException } from '@/modules/qna/exception/qna.exception';
import { QnARepository } from '@/modules/qna/qna.repository';
import { UserRepository } from '@/modules/user/user.repository';

import { QnACountDTO } from '../dto/qna';
import { HOST_ERROR_CODE } from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostQnAService {
  constructor(
    private readonly qnaRepository: QnARepository,
    private readonly messageEvent: MessageEvent,
    private readonly database: PrismaService,
    private readonly historyRepository: HistoryRepository,
    private readonly userRepository: UserRepository
  ) {}

  async findQnA(id: string) {
    return await this.qnaRepository.findQnA(id);
  }

  async countQnA(args = {} as Prisma.SpaceQnACountArgs) {
    console.log(args.where.answers);

    const count = await this.qnaRepository.countQna(args);
    return new QnACountDTO({ count });
  }

  async findQnAs(args = {} as Prisma.SpaceQnAFindManyArgs) {
    return await this.qnaRepository.findQnAs(args);
  }

  async findPagingQnAs(paging: PagingDTO, args = {} as Prisma.SpaceQnAFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.qnaRepository.countQna({
      where: {
        ...args.where,
      },
    });
    const qnas = await this.qnaRepository.findQnAs({
      where: {
        ...args.where,
      },
      skip,
      take,
    });
    return new PaginationDTO<QnADTO>(qnas, { count, paging });
  }

  async findQnAAnswer(id: string) {
    return await this.qnaRepository.findQnAAnswer(id);
  }

  async createQnAAnswer(hostId: string, qnaId: string, data: CreateQnAAnswerDTO) {
    const qna = await this.findQnA(qnaId);
    const qnaAnswerId = await this.qnaRepository.createQnAAnswer(hostId, qnaId, data);

    this.messageEvent.createQnAAnswerAlarm({
      userId: qna.user.id,
      spaceName: qna.space.title,
      nickname: qna.user.nickname || qna.user.name,
      spaceId: qna.space.id,
    });

    return qnaAnswerId;
  }

  async updateQnAAnswer(qnaAnswerId: string, hostId: string, data: UpdateQnAAnswerDTO) {
    const answer = await this.findQnAAnswer(qnaAnswerId);

    if (answer.host.id !== hostId) {
      throw new QnAException(QNA_ERROR_CODE.QNA_ANSWER_MUTATION_FORBIDDEN);
    }

    const timeDiff = getTimeDiff(answer.createdAt, new Date());

    if (timeDiff > 72) {
      throw new QnAException(QNA_ERROR_CODE.QNA_ANSWER_UPDATE_DUE_DATE);
    }

    await this.historyRepository.createHistory({
      content: answer.content,
      writtenAt: answer.createdAt,
      spaceQnAAnswerId: qnaAnswerId,
    });
    await this.qnaRepository.updateQnAAnswer(qnaAnswerId, data);
  }

  async deleteQnAAnswer(qnaAnswerId: string, hostId: string) {
    const answer = await this.findQnAAnswer(qnaAnswerId);

    if (answer.host.id !== hostId) {
      throw new QnAException(QNA_ERROR_CODE.QNA_ANSWER_MUTATION_FORBIDDEN);
    }

    await this.qnaRepository.deleteQnAAnswer(qnaAnswerId);
  }
}
