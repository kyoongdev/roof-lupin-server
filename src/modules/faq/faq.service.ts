import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CreateFAQDTO, FAQDTO } from './dto';
import { UserUpdateFAQDTO } from './dto/user-update-faq.dto';
import { FAQ_ERROR_CODE, FAQ_MUTATION_FORBIDDEN } from './exception/errorCode';
import { FAQException } from './exception/faq.exception';
import { FaqRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(private readonly FaqRepository: FaqRepository) {}

  async findFAQ(id: string) {
    return await this.FaqRepository.findFAQ(id);
  }

  async findPagingFAQ(paging: PagingDTO, args = {} as Prisma.FAQFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.FaqRepository.countFAQs({
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
    const faqs = await this.FaqRepository.findFAQs({
      ...args,
      where: {
        ...args.where,
        deletedAt: null,
      },
      skip,
      take,
    });

    return new PaginationDTO<FAQDTO>(faqs, { count, paging });
  }

  async createFAQ(userId: string, data: CreateFAQDTO) {
    return await this.FaqRepository.createFAQ(userId, data);
  }

  async updateFAQ(id: string, userId: string, data: UserUpdateFAQDTO) {
    const faq = await this.findFAQ(id);
    if (faq.user.id !== userId) {
      throw new FAQException(FAQ_ERROR_CODE.FORBIDDEN(FAQ_MUTATION_FORBIDDEN));
    }
    await this.FaqRepository.updateFAQ(id, data);
  }

  async deleteFAQ(id: string, userId: string) {
    const faq = await this.findFAQ(id);

    if (faq.user.id !== userId) {
      throw new FAQException(FAQ_ERROR_CODE.FORBIDDEN(FAQ_MUTATION_FORBIDDEN));
    }

    await this.FaqRepository.deleteFAQ(id);
  }
}
