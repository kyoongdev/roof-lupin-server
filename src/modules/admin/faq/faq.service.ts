import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { FAQDTO } from '@/modules/faq/dto';
import { FaqRepository } from '@/modules/faq/faq.repository';

import { AdminUpdateFAQAnswerDTO } from '../dto/faq';

@Injectable()
export class AdminFaqService {
  constructor(private readonly FaqRepository: FaqRepository) {}

  async findFAQ(id: string) {
    return await this.FaqRepository.findFAQ(id);
  }

  async findPagingFAQ(paging: PagingDTO, args = {} as Prisma.FAQFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.FaqRepository.countFAQs({
      where: args.where,
    });
    const faqs = await this.FaqRepository.findFAQs({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<FAQDTO>(faqs, { count, paging });
  }

  async updateAnswerFAQ(id: string, data: AdminUpdateFAQAnswerDTO) {
    await this.findFAQ(id);
    await this.FaqRepository.updateFAQ(id, data);
  }

  async deleteFAQ(id: string) {
    await this.findFAQ(id);
    await this.FaqRepository.deleteFAQ(id);
  }
}
