import { Delete, Get, Param } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { QnADTO } from '@/modules/qna/dto';
import { ApiController } from '@/utils';

import { AdminQnAService } from './qna.service';

@ApiController('admin/qnas', '관리자 Q&A 관리')
export class AdminQnAController {
  constructor(private readonly adminQnAService: AdminQnAService) {}

  @Get()
  @RequestApi({
    summary: {
      description: 'Q&A 조회',
      summary: 'Q&A 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: QnADTO,
    isPaging: true,
  })
  async findPagingQnAs(@Paging() paging: PagingDTO) {
    return await this.adminQnAService.findPagingQnAs(paging);
  }

  @Delete(':qnaId')
  @RequestApi({
    summary: {
      description: 'Q&A 삭제',
      summary: 'Q&A 삭제',
    },
    params: {
      name: 'qnaId',
      type: 'string',
      description: 'Q&A 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteQnA(@Param('qnaId') qnaId: string) {
    await this.adminQnAService.deleteQnA(qnaId);
  }

  @Delete('/answer/:qnaAnswerId')
  @RequestApi({
    summary: {
      description: 'Q&A 답변 삭제',
      summary: 'Q&A 답변 삭제',
    },
    params: {
      name: 'qnaAnswerId',
      type: 'string',
      description: 'Q&A 답변 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteQnAAnswer(@Param('qnaAnswerId') qnaAnswerId: string) {
    await this.adminQnAService.deleteQnAAnswer(qnaAnswerId);
  }
}
