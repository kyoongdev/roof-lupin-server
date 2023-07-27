import { Delete, Get, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateFAQDTO, FAQDTO, UpdateFAQDTO } from './dto';
import { FaqService } from './faq.service';

@ApiController('faqs', 'FAQ')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

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
}
