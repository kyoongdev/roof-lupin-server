import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { GUEST_TERMS, HOST_TERMS } from '@/common/constants/terms';
import { UploadedFileDTO } from '@/modules/file/dto';
import { TermDTO } from '@/modules/terms/dto';
import { ApiController } from '@/utils';

import { CreateTermDTO, UpdateTermDTO } from '../dto/terms';

import { AdminTermsService } from './terms.service';

@ApiController('/terms', '[관리자] 약관 관리')
export class AdminTermsController {
  constructor(private readonly termsService: AdminTermsService) {}

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

  @Post()
  @RequestApi({
    summary: {
      description: '약관 생성하기',
      summary: '약관 생성하기',
    },
  })
  @ResponseApi(
    {
      type: UploadedFileDTO,
    },
    201
  )
  async createTerm(@Body() body: CreateTermDTO) {
    return await this.termsService.createTerm(body);
  }

  @Patch(':name')
  @RequestApi({
    summary: {
      description: '약관 수정하기',
      summary: '약관 수정하기',
    },
  })
  @ResponseApi(
    {
      type: UploadedFileDTO,
    },
    200
  )
  async updateTerm(@Param('name') name: string, @Body() body: UpdateTermDTO) {
    return await this.termsService.updateTerm(name, body);
  }

  @Delete(':name')
  @RequestApi({
    summary: {
      description: '약관 삭제하기',
      summary: '약관 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteTerm(@Param('name') name: string) {
    return await this.termsService.deleteTerm(name);
  }
}
