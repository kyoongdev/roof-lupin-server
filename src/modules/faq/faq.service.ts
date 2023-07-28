import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CreateFAQDTO, FAQDTO } from './dto';
import { UserUpdateFAQDTO } from './dto/user-update-faq.dto';
import { FAQ_ERROR_CODE, FAQ_MUTATION_FORBIDDEN } from './exception/errorCode';
import { FAQException } from './exception/faq.exception';
import { FAQRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepository: FAQRepository) {}

  async findFAQ(id: string) {
    return await this.faqRepository.findFAQ(id);
  }

  async findPagingFAQ(paging: PagingDTO, args = {} as Prisma.FAQFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.faqRepository.countFAQs({
      where: args.where,
    });
    const faqs = await this.faqRepository.findFAQs({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<FAQDTO>(faqs, { count, paging });
  }

  async createFAQ(userId: string, data: CreateFAQDTO) {
    return await this.faqRepository.createFAQ(userId, data);
  }

  async updateFAQ(id: string, userId: string, data: UserUpdateFAQDTO) {
    const faq = await this.findFAQ(id);
    if (faq.user.id !== userId) {
      throw new FAQException(FAQ_ERROR_CODE.FORBIDDEN(FAQ_MUTATION_FORBIDDEN));
    }
    await this.faqRepository.updateFAQ(id, data);
  }

  async deleteFAQ(id: string, userId: string) {
    const faq = await this.findFAQ(id);

    if (faq.user.id !== userId) {
      throw new FAQException(FAQ_ERROR_CODE.FORBIDDEN(FAQ_MUTATION_FORBIDDEN));
    }

    await this.faqRepository.deleteFAQ(id);
  }
}
