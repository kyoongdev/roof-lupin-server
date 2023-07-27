import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateQnADTO, QnADTO, UpdateQnADTO } from './dto';
import { QnAService } from './qna.service';

@ApiController('qnas', '공간 Q&A')
export class QnAController {
  constructor(private readonly qnaService: QnAService) {}

  @Get('me/list')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내 Q&A 조회',
      summary: '내 Q&A 조회 - 유저만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: QnADTO,
    isArray: true,
  })
  async getMyQnA(@ReqUser() user: RequestUser) {
    return this.qnaService.findQnAs({
      where: {
        userId: user.id,
      },
    });
  }

  @Get('me/paging')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내 Q&A 조회',
      summary: '내 Q&A 조회 - 유저만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: QnADTO,
    isPaging: true,
  })
  async getMyPagingQnA(@Paging() paging: PagingDTO, @ReqUser() user: RequestUser) {
    return this.qnaService.findPagingQnAs(paging, {
      where: {
        userId: user.id,
      },
    });
  }

  @Get(':spaceId/list')
  @RequestApi({
    summary: {
      description: '공간 Q&A 조회',
      summary: '공간 Q&A 조회',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
    },
  })
  @ResponseApi({
    type: QnADTO,
    isArray: true,
  })
  async getSpaceQnA(@Param('spaceId') spaceId: string) {
    return this.qnaService.findQnAs({
      where: {
        spaceId,
      },
    });
  }

  @Get(':spaceId/paging')
  @RequestApi({
    summary: {
      description: '공간 Q&A 조회',
      summary: '공간 Q&A 조회',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: QnADTO,
    isPaging: true,
  })
  async getPagingSpaceQnA(@Param('spaceId') spaceId: string, @Paging() paging: PagingDTO) {
    return this.qnaService.findPagingQnAs(paging, {
      where: {
        spaceId,
      },
    });
  }

  @Post('')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 Q&A 생성',
      summary: '공간 Q&A 생성 - 유저만 사용 가능합니다.',
    },
    body: {
      type: CreateQnADTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSpaceQnA(@ReqUser() user: RequestUser, @Body() data: CreateQnADTO) {
    return this.qnaService.createQnA(user.id, data);
  }

  @Patch(':qnaId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 Q&A 수정',
      summary: '공간 Q&A 수정 - 유저만 사용 가능합니다.',
    },
    params: {
      name: 'qnaId',
      type: 'string',
      description: 'Q&A 아이디',
    },
    body: {
      type: UpdateQnADTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateSpaceQnA(@Param('qnaId') qnaId: string, @ReqUser() user: RequestUser, @Body() data: CreateQnADTO) {
    return this.qnaService.updateQnA(qnaId, user.id, data);
  }

  @Delete(':qnaId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 Q&A 삭제',
      summary: '공간 Q&A 삭제 - 유저만 사용 가능합니다.',
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
  async deleteSpaceQnA(@Param('qnaId') qnaId: string, @ReqUser() user: RequestUser) {
    return this.qnaService.deleteQnA(qnaId, user.id);
  }
}
