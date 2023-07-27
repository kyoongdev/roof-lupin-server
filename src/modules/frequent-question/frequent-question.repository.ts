import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class FrequentQuestionRepository {
  constructor(private readonly database: PrismaService) {}

  async findFrequentQuestions(args = {} as Prisma.FrequentQuestionFindManyArgs) {
    //
  }
}
