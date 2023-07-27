import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateFrequentQuestionDTO, FrequentQuestionDTO, UpdateFrequentQuestionDTO } from './dto';
import { FREQUENT_QUESTION_ERROR_CODE, FREQUENT_QUESTION_NOT_FOUND } from './exception/errorCode';
import { FrequentQuestionException } from './exception/frequent-question.exception';

@Injectable()
export class FrequentQuestionRepository {
  constructor(private readonly database: PrismaService) {}

  async findFrequentQuestion(id: string) {
    const question = await this.database.frequentQuestion.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      throw new FrequentQuestionException(FREQUENT_QUESTION_ERROR_CODE.NOT_FOUND(FREQUENT_QUESTION_NOT_FOUND));
    }

    return new FrequentQuestionDTO(question);
  }

  async countFrequentQuestions(args = {} as Prisma.FrequentQuestionCountArgs) {
    return await this.database.frequentQuestion.count(args);
  }

  async findFrequentQuestions(args = {} as Prisma.FrequentQuestionFindManyArgs) {
    const questions = await this.database.frequentQuestion.findMany(args);

    return questions.map((question) => new FrequentQuestionDTO(question));
  }

  async createFrequentQuestion(data: CreateFrequentQuestionDTO) {
    const question = await this.database.frequentQuestion.create({
      data,
    });

    return question.id;
  }

  async updateFrequentQuestion(id: string, data: UpdateFrequentQuestionDTO) {
    await this.database.frequentQuestion.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteFrequentQuestion(id: string) {
    await this.database.frequentQuestion.delete({
      where: {
        id,
      },
    });
  }
}
