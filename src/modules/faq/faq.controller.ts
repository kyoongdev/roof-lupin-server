import { Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { FAQDTO } from './dto';
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
