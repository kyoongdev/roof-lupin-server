import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CreateQnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO } from '@/modules/qna/dto';
import { QnARepository } from '@/modules/qna/qna.repository';

import { HOST_ERROR_CODE, QNA_ANSWER_MUTATION_FORBIDDEN } from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostQnAService {
  constructor(private readonly qnaRepository: QnARepository) {}

  async findQnA(id: string) {
    return await this.qnaRepository.findQnA(id);
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
    await this.findQnA(data.qnaId);
    return await this.qnaRepository.createQnAAnswer(hostId, data);
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
