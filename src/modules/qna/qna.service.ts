import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { HostRepository } from '../host/host.repository';
import { SpaceRepository } from '../space/space.repository';

import { CreateQnADTO, QnADTO, UpdateQnADTO } from './dto';
import { QNA_ERROR_CODE, QNA_MUTATION_FORBIDDEN } from './exception/errorCode';
import { QnAException } from './exception/qna.exception';
import { QnARepository } from './qna.repository';

@Injectable()
export class QnAService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly qnaRepository: QnARepository,
    private readonly hostRepository: HostRepository
  ) {}

  async findPagingQnAs(paging: PagingDTO, args = {} as Prisma.SpaceQnAFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.qnaRepository.countQna();
    const qnas = await this.qnaRepository.findQnAs({
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<QnADTO>(qnas, { count, paging });
  }

  async createQnA(userId: string, data: CreateQnADTO) {
    return await this.qnaRepository.createQnA(userId, data);
  }
  async updateQnA(qnaId: string, userId: string, data: UpdateQnADTO) {
    await this.qnaRepository.findQnA(qnaId);
    await this.checkIsUserValid(qnaId, userId);

    await this.qnaRepository.updateQnA(qnaId, data);
  }

  async deleteQnA(qnaId: string, userId: string) {
    await this.qnaRepository.findQnA(qnaId);
    await this.checkIsUserValid(qnaId, userId);

    await this.qnaRepository.deleteQnA(qnaId);
  }

  async checkIsUserValid(qnaId: string, userId: string) {
    const qna = await this.qnaRepository.findQnA(qnaId);

    if (qna.user.id !== userId) {
      throw new QnAException(QNA_ERROR_CODE.FORBIDDEN(QNA_MUTATION_FORBIDDEN));
    }
  }
}
