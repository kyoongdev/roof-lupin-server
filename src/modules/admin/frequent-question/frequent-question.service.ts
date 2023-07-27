import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CreateFrequentQuestionDTO, UpdateFrequentQuestionDTO } from '@/modules/frequent-question/dto';
import { FrequentQuestionRepository } from '@/modules/frequent-question/frequent-question.repository';

@Injectable()
export class AdminFrequentQuestionService {
  constructor(private readonly frequentQuestionRepository: FrequentQuestionRepository) {}

  async findFrequentQuestion(id: string) {
    return await this.frequentQuestionRepository.findFrequentQuestion(id);
  }

  async findFrequentQuestions(args = {} as Prisma.FrequentQuestionFindManyArgs) {
    return await this.frequentQuestionRepository.findFrequentQuestions(args);
  }

  async createFrequentQuestion(data: CreateFrequentQuestionDTO) {
    return await this.frequentQuestionRepository.createFrequentQuestion(data);
  }

  async updateFrequentQuestion(id: string, data: UpdateFrequentQuestionDTO) {
    await this.frequentQuestionRepository.findFrequentQuestion(id);
    await this.frequentQuestionRepository.updateFrequentQuestion(id, data);
  }

  async deleteFrequentQuestion(id: string) {
    await this.frequentQuestionRepository.findFrequentQuestion(id);
    await this.frequentQuestionRepository.deleteFrequentQuestion(id);
  }
}
