import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CreateFAQDTO, FAQDTO, UpdateFAQDTO } from '@/modules/faq/dto';
import { FAQ_ERROR_CODE } from '@/modules/faq/exception/errorCode';
import { FAQException } from '@/modules/faq/exception/faq.exception';

@Injectable()
export class FaqRepository {
  constructor(private readonly database: PrismaService) {}

  async findFAQ(id: string) {
    const faq = await this.database.fAQ.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
    });

    if (!faq) {
      throw new FAQException(FAQ_ERROR_CODE.FAQ_NOT_FOUND);
    }
    return new FAQDTO(faq);
  }

  async countFAQs(args = {} as Prisma.FAQCountArgs) {
    return await this.database.fAQ.count(args);
  }

  async findFAQs(args = {} as Prisma.FAQFindManyArgs) {
    const faqs = await this.database.fAQ.findMany({
      ...args,
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
    });

    return faqs.map((faq) => new FAQDTO(faq));
  }

  async createFAQ(userId: string, data: CreateFAQDTO) {
    const faq = await this.database.fAQ.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return faq.id;
  }

  async updateFAQ(id: string, data: UpdateFAQDTO) {
    await this.database.fAQ.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteFAQ(id: string) {
    await this.database.fAQ.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
  async hardDeleteFAQ(id: string) {
    await this.database.fAQ.delete({
      where: {
        id,
      },
    });
  }
}
