import { Injectable } from '@nestjs/common';

import { CreateFrequentQuestionDTO, UpdateFrequentQuestionDTO } from '@/modules/frequent-question/dto';
import { FrequentQuestionRepository } from '@/modules/frequent-question/frequent-question.repository';

@Injectable()
export class AdminFrequentQuestionService {
  constructor(private readonly frequentQuestionRepository: FrequentQuestionRepository) {}

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
