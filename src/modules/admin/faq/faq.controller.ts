import { Body, Delete, Get, Param, Patch, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { FAQDTO } from '@/modules/faq/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminUpdateFAQAnswerDTO } from '../dto/faq';
import { AdminFindFAQsQuery } from '../dto/query/faq';

import { AdminFaqService } from './faq.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('/faqs', '[관리자] FAQ 관리')
export class AdminFaqController {
  constructor(private readonly faqService: AdminFaqService) {}

  @Get(':faqId/detail')
  @RequestApi({
    summary: {
      description: ' FAQ 상세 조회',
      summary: ' FAQ 상세 조회',
    },
  })
  @ResponseApi({
    type: FAQDTO,
  })
  async findFAQ(@Param('faqId') id: string) {
    return await this.faqService.findFAQ(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: ' FAQ 목록 조회',
      summary: ' FAQ 목록 조회',
    },
  })
  @ResponseApi({
    type: FAQDTO,
    isPaging: true,
  })
  async findFAQs(@Paging() paging: PagingDTO, @Query() query: AdminFindFAQsQuery) {
    return await this.faqService.findPagingFAQ(paging, query.generateQuery());
  }

  @Patch(':faqId/answer')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: ' FAQ 답변',
      summary: ' FAQ 답변 - 관리자만 사용가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateFAQ(@Param('faqId') id: string, @Body() body: AdminUpdateFAQAnswerDTO) {
    await this.faqService.updateAnswerFAQ(id, body);
  }

  @Delete(':faqId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: ' FAQ 삭제',
      summary: ' FAQ 삭제 - 관리자만 사용가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteFAQ(@Param('faqId') id: string) {
    await this.faqService.deleteFAQ(id);
  }
}
