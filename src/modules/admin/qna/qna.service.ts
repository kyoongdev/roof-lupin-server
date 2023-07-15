import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { QnADTO } from '@/modules/qna/dto';
import { QnARepository } from '@/modules/qna/qna.repository';

@Injectable()
export class AdminQnAService {
  constructor(private readonly qnaRepository: QnARepository) {}

  async findQnA(qnaId: string) {
    return await this.qnaRepository.findQnA(qnaId);
  }

  async findPagingQnAs(paging: PagingDTO, args = {} as Prisma.SpaceQnAFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.qnaRepository.countQna();
    const qnas = await this.qnaRepository.findQnAs({
      where: {
        ...args.where,
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

  async deleteQnA(qnaId: string) {
    await this.qnaRepository.findQnA(qnaId);
    await this.qnaRepository.deleteQnA(qnaId);
  }

  async deleteQnAAnswer(qnaAnswerId: string) {
    await this.qnaRepository.findQnAAnswer(qnaAnswerId);
    await this.qnaRepository.deleteQnAAnswer(qnaAnswerId);
  }

  async hardDeleteQnAAnswer(qnaAnswerId: string) {
    await this.qnaRepository.findQnAAnswer(qnaAnswerId);
    await this.qnaRepository.hardDeleteQnAAnswer(qnaAnswerId);
  }
}
