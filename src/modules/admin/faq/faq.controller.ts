import { Delete, Get, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateFAQDTO, FAQDTO, UpdateFAQDTO } from '@/modules/faq/dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFaqService } from './faq.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('/faqs', '[관리자] FAQ 관리')
export class AdminFaqController {
  constructor(private readonly faqService: AdminFaqService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 (FAQ) 목록 조회',
      summary: '자주 묻는 질문 (FAQ) 목록 조회',
    },
  })
  @ResponseApi({
    type: FAQDTO,
    isArray: true,
  })
  async findFAQs() {
    return await this.faqService.findFAQs();
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 (FAQ) 생성',
      summary: '자주 묻는 질문 (FAQ) 생성 - 관리자만 사용가능합니다.',
    },
    body: {
      type: CreateFAQDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createFAQ(data: CreateFAQDTO) {
    return await this.faqService.createFAQ(data);
  }

  @Patch(':faqId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 (FAQ) 수정',
      summary: '자주 묻는 질문 (FAQ) 수정 - 관리자만 사용가능합니다.',
    },
    params: {
      name: 'faqId',
      description: 'FAQ ID',
      required: true,
      type: 'string',
    },
    body: {
      type: UpdateFAQDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateFAQ(id: string, data: UpdateFAQDTO) {
    await this.faqService.updateFAQ(id, data);
  }

  @Delete(':faqId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '자주 묻는 질문 (FAQ) 삭제',
      summary: '자주 묻는 질문 (FAQ) 삭제 - 관리자만 사용가능합니다.',
    },
    params: {
      name: 'faqId',
      description: 'FAQ ID',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteFAQ(id: string) {
    await this.faqService.deleteFAQ(id);
  }
}
