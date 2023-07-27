import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { FrequentQuestionRepository } from './frequent-question.repository';

@Injectable()
export class FrequentQuestionService {
  constructor(private readonly frequentQuestionRepository: FrequentQuestionRepository) {}

  async findFrequentQuestion(id: string) {
    return await this.frequentQuestionRepository.findFrequentQuestion(id);
  }

  async findFrequentQuestions(args = {} as Prisma.FrequentQuestionFindManyArgs) {
    return await this.frequentQuestionRepository.findFrequentQuestions(args);
  }
}
