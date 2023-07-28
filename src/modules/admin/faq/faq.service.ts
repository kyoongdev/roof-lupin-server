import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { CreateFAQDTO, FAQDTO, UpdateFAQDTO } from '@/modules/faq/dto';
import { FAQ_ERROR_CODE, FAQ_NOT_FOUND } from '@/modules/faq/exception/errorCode';
import { FAQException } from '@/modules/faq/exception/faq.exception';

import { AdminUpdateFAQAnswerDTO } from '../dto/faq';

@Injectable()
export class AdminFaqService {
  constructor(private readonly database: PrismaService) {}

  async findFAQ(id: string) {
    const faq = await this.database.fAQ.findUnique({
      where: {
        id,
      },
    });

    if (!faq) {
      throw new FAQException(FAQ_ERROR_CODE.NOT_FOUND(FAQ_NOT_FOUND));
    }
    return new FAQDTO(faq);
  }

  async findPagingFAQ(paging: PagingDTO, args = {} as Prisma.FAQFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.countFAQs({
      where: args.where,
    });
    const faqs = await this.findFAQs({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<FAQDTO>(faqs, { count, paging });
  }

  async countFAQs(args = {} as Prisma.FAQCountArgs) {
    return await this.database.fAQ.count(args);
  }

  async findFAQs(args = {} as Prisma.FAQFindManyArgs) {
    const faqs = await this.database.fAQ.findMany({
      ...args,
    });

    return faqs.map((faq) => new FAQDTO(faq));
  }

  async updateAnswerFAQ(id: string, data: AdminUpdateFAQAnswerDTO) {
    await this.findFAQ(id);
    await this.database.fAQ.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteFAQ(id: string) {
    await this.findFAQ(id);
    await this.database.fAQ.delete({
      where: {
        id,
      },
    });
  }
}
