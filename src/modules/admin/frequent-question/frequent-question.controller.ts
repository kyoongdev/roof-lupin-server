import { Body, Delete, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateFrequentQuestionDTO, UpdateFrequentQuestionDTO } from '@/modules/frequent-question/dto';
import { ApiController, ResponseWithId, ResponseWithIdInterceptor } from '@/utils';

import { AdminFrequentQuestionService } from './frequent-question.service';

@ApiController('frequent-questions', '[관리자] 자주 묻는 질문')
export class AdminFrequentlyQuestionController {
  constructor(private readonly frequentQuestionService: AdminFrequentQuestionService) {}

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 생성',
      summary: '자주 묻는 질문 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createFrequentQuestion(@Body() body: CreateFrequentQuestionDTO) {
    return await this.frequentQuestionService.createFrequentQuestion(body);
  }

  @Patch(':frequentQuestionId')
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 수정',
      summary: '자주 묻는 질문 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateFrequentQuestion(@Param('frequentQuestionId') id: string, @Body() body: UpdateFrequentQuestionDTO) {
    await this.frequentQuestionService.updateFrequentQuestion(id, body);
  }

  @Delete(':frequentQuestionId')
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 삭제',
      summary: '자주 묻는 질문 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteFrequentQuestion(@Param('frequentQuestionId') id: string) {
    await this.frequentQuestionService.deleteFrequentQuestion(id);
  }
}
