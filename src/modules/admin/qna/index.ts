import { Delete, Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { QnADTO } from '@/modules/qna/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminQnAService } from './qna.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('qnas', '[관리자] Q&A 관리')
export class AdminQnAController {
  constructor(private readonly adminQnAService: AdminQnAService) {}

  @Get(':qnaId/detail')
  @RequestApi({
    summary: {
      description: 'Q&A 상세 조회',
      summary: 'Q&A 상세 조회',
    },
    params: {
      name: 'qnaId',
      type: 'string',
      description: 'Q&A 아이디',
    },
  })
  @ResponseApi({
    type: QnADTO,
  })
  async findQnA(@Param('qnaId') qnaId: string) {
    return await this.adminQnAService.findQnA(qnaId);
  }

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

  @Delete('/answer/:qnaAnswerId/hard')
  @RequestApi({
    summary: {
      description: 'Q&A 답변 hard delete',
      summary: 'Q&A 답변 hard delete',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async hardDeleteQnAAnswer(@Param('qnaAnswerId') qnaAnswerId: string) {
    await this.adminQnAService.hardDeleteQnAAnswer(qnaAnswerId);
  }
}
