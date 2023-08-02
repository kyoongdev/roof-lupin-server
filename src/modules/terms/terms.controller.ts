import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { GUEST_TERMS, HOST_TERMS } from '@/common/constants/terms';
import { ApiController } from '@/utils';

import { TermDTO } from './dto';
import { TermsService } from './terms.service';

@ApiController('terms', '약관')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '약관 리스트 불러오기',
      summary: '약관 리스트 불러오기',
    },
  })
  @ResponseApi({
    type: TermDTO,
    isArray: true,
  })
  async getTerms() {
    return await this.termsService.getTerms();
  }

  @Get(':name')
  @RequestApi({
    summary: {
      description: '약관 단건 불러오기',
      summary: '약관 단건 불러오기',
    },
    params: {
      type: 'string',
      enum: [...Object.values(GUEST_TERMS), ...Object.values(HOST_TERMS)],
      name: '약관 이름',
    },
  })
  @ResponseApi({
    type: TermDTO,
  })
  async getTerm(@Param('name') key: string) {
    return await this.termsService.getTerm(key);
  }
}
