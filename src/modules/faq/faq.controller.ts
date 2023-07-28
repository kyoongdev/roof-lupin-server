import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateFAQDTO, FAQDTO } from './dto';
import { FaqService } from './faq.service';

@ApiController('faqs', 'FAQ')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @RequestApi({
    summary: {
      description: 'FAQ 목록 조회',
      summary: 'FAQ 목록 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: FAQDTO,
    isPaging: true,
  })
  async findFAQs(@Paging() paging: PagingDTO) {
    return await this.faqService.findPagingFAQ(paging);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: 'FAQ 등록',
      summary: 'FAQ 등록',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createFAQ(@ReqUser() user: RequestUser, @Body() body: CreateFAQDTO) {
    return await this.faqService.createFAQ(user.id, body);
  }

  @Patch(':faqId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: 'FAQ 수정',
      summary: 'FAQ 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateFAQ(@Param('faqId') id: string, @ReqUser() user: RequestUser, @Body() body: CreateFAQDTO) {
    return await this.faqService.updateFAQ(id, user.id, body);
  }

  @Delete(':faqId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: 'FAQ 삭제',
      summary: 'FAQ 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteFAQ(@Param('faqId') id: string, @ReqUser() user: RequestUser) {
    return await this.faqService.deleteFAQ(id, user.id);
  }
}
