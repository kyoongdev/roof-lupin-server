import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { FrequentQuestionDTO } from './dto';
import { FrequentQuestionService } from './frequent-question.service';

@ApiController('frequent-questions', '자주 묻는 질문')
export class FrequentQuestionController {
  constructor(private readonly frequentQuestionService: FrequentQuestionService) {}

  @Get(':frequentQuestionId/detail')
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 단일 조회',
      summary: '자주 묻는 질문 단일 조회',
    },
  })
  @ResponseApi({
    type: FrequentQuestionDTO,
  })
  async getFrequentQuestion(@Param('frequentQuestionId') id: string) {
    return await this.frequentQuestionService.findFrequentQuestion(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 리스트 조회',
      summary: '자주 묻는 질문 리스트 조회',
    },
  })
  @ResponseApi({
    type: FrequentQuestionDTO,
  })
  async getFrequentQuestions() {
    return await this.frequentQuestionService.findFrequentQuestions();
  }
}
