import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { CreateQnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO } from '@/modules/qna/dto';
import { QnARepository } from '@/modules/qna/qna.repository';

import { QnACountDTO } from '../dto/qna';
import { HOST_ERROR_CODE, QNA_ANSWER_MUTATION_FORBIDDEN } from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostQnAService {
  constructor(
    private readonly qnaRepository: QnARepository,
    private readonly fcmEvent: FCMEvent,
    private readonly database: PrismaService
  ) {}

  async findQnA(id: string) {
    return await this.qnaRepository.findQnA(id);
  }

  async countQnA(args = {} as Prisma.SpaceQnACountArgs) {
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

  async createQnAAnswer(hostId: string, data: CreateQnAAnswerDTO) {
    const qna = await this.findQnA(data.qnaId);
    const qnaAnswerId = await this.qnaRepository.createQnAAnswer(hostId, data);

    const user = await this.database.user.findUnique({
      where: {
        id: qna.user.id,
      },
      select: {
        id: true,
        pushToken: true,
        isAlarmAccepted: true,
        name: true,
        nickname: true,
      },
    });

    this.fcmEvent.createQnAAnswerAlarm({
      userId: user.id,
      pushToken: user.pushToken,
      spaceName: qna.space.title,
      nickname: user.nickname || user.name,
      isAlarmAccepted: user.isAlarmAccepted,
    });

    return qnaAnswerId;
  }

  async updateQnAAnswer(qnaAnswerId: string, hostId: string, data: UpdateQnAAnswerDTO) {
    const answer = await this.findQnAAnswer(qnaAnswerId);

    if (answer.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(QNA_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.qnaRepository.updateQnAAnswer(qnaAnswerId, data);
  }

  async deleteQnAAnswer(qnaAnswerId: string, hostId: string) {
    const answer = await this.findQnAAnswer(qnaAnswerId);

    if (answer.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(QNA_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.qnaRepository.deleteQnAAnswer(qnaAnswerId);
  }
}
