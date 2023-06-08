import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateFAQDTO, FAQDTO, UpdateFAQDTO } from './dto';
import { FAQ_ERROR_CODE, FAQ_NOT_FOUND } from './exception/errorCode';
import { FAQException } from './exception/faq.exception';

@Injectable()
export class FaqService {
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

  async countFAQs(args = {} as Prisma.FAQCountArgs) {
    return await this.database.fAQ.count(args);
  }

  async findFAQs(args = {} as Prisma.FAQFindManyArgs) {
    const faqs = await this.database.fAQ.findMany({
      ...args,
      orderBy: {
        order: 'asc',
      },
    });

    return faqs.map((faq) => new FAQDTO(faq));
  }

  async createFAQ(data: CreateFAQDTO) {
    const faq = await this.database.fAQ.create({ data });
    return faq.id;
  }

  async updateFAQ(id: string, data: UpdateFAQDTO) {
    await this.findFAQ(id);
    const faq = await this.database.fAQ.update({
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
