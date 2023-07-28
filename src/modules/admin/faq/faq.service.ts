import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { FAQDTO } from '@/modules/faq/dto';
import { FAQ_ERROR_CODE, FAQ_NOT_FOUND } from '@/modules/faq/exception/errorCode';
import { FAQException } from '@/modules/faq/exception/faq.exception';
import { FAQRepository } from '@/modules/faq/faq.repository';

import { AdminUpdateFAQAnswerDTO } from '../dto/faq';

@Injectable()
export class AdminFaqService {
  constructor(private readonly faqRepository: FAQRepository) {}

  async findFAQ(id: string) {
    const faq = await this.faqRepository.findFAQ(id);

    if (!faq) {
      throw new FAQException(FAQ_ERROR_CODE.NOT_FOUND(FAQ_NOT_FOUND));
    }
    return new FAQDTO(faq);
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

  async updateAnswerFAQ(id: string, data: AdminUpdateFAQAnswerDTO) {
    await this.findFAQ(id);
    await this.faqRepository.updateFAQ(id, data);
  }

  async deleteFAQ(id: string) {
    await this.findFAQ(id);
    await this.faqRepository.deleteFAQ(id);
  }
}
