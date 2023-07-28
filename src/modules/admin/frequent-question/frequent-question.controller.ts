import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import {
  CreateFrequentQuestionDTO,
  FrequentQuestionDTO,
  UpdateFrequentQuestionDTO,
} from '@/modules/frequent-question/dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFrequentQuestionService } from './frequent-question.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('frequent-questions', '[관리자] 자주 묻는 질문')
export class AdminFrequentlyQuestionController {
  constructor(private readonly frequentQuestionService: AdminFrequentQuestionService) {}

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
    isArray: true,
  })
  async getFrequentQuestions() {
    return await this.frequentQuestionService.findFrequentQuestions();
  }

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
