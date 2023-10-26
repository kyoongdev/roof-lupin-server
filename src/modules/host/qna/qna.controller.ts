import { Body, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { CreateQnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO } from '@/modules/qna/dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { QnACountDTO } from '../dto/qna';
import { HostFindQnACountQuery } from '../dto/query';
import { HostFindQnAsQuery } from '../dto/query/qna/find-qnas.query';

import { HostQnAService } from './qna.service';

@ApiController('qnas', '[호스트] QnA 관리')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostQnAController {
  constructor(private readonly qnaService: HostQnAService) {}

  @Get(':qnaId/detail')
  @RequestApi({
    summary: {
      description: 'QnA 상세 조회',
      summary: 'QnA 상세 조회 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'qnaId',
      type: 'string',
      required: true,
      description: 'QnA 아이디',
    },
  })
  @ResponseApi({
    type: QnADTO,
  })
  async getQnA(@Param('qnaId') qnaId: string) {
    return await this.qnaService.findQnA(qnaId);
  }

  @Get('/spaces/:spaceId')
  @RequestApi({
    summary: {
      description: 'QnA 목록 조회',
      summary: '공간 QnA 목록 조회 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      required: true,
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
  async getQnAsBySpaceID(@Paging() paging: PagingDTO, @Param('spaceId') spaceId: string, @ReqUser() user: RequestHost) {
    return await this.qnaService.findPagingQnAs(paging, {
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
      },
    });
  }

  @Get('')
  @RequestApi({
    summary: {
      description: 'QnA 목록 조회',
      summary: 'QnA 목록 조회 - 호스트만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: QnADTO,
    isPaging: true,
  })
  async getQnAs(@Paging() paging: PagingDTO, @ReqUser() user: RequestHost, @Query() query: HostFindQnAsQuery) {
    return await this.qnaService.findPagingQnAs(paging, {
      where: {
        ...query.generateQuery(),
        space: {
          hostId: user.id,
        },
      },
    });
  }

  @Get('/spaces/:spaceId/count')
  @RequestApi({
    summary: {
      description: 'QnA 개수 조회',
      summary: 'QnA 개수 조회',
    },
  })
  @ResponseApi({
    type: QnACountDTO,
  })
  async getNotAnsweredQnACount(
    @ReqUser() user: RequestHost,
    @Param('spaceId') spaceId: string,
    @Query() query: HostFindQnACountQuery
  ) {
    return await this.qnaService.countQnA({
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
        ...query.generateQuery(),
      },
    });
  }

  @Get('/spaces/:spaceId/answered')
  @RequestApi({
    summary: {
      description: '답변 QnA  조회',
      summary: '답변 QnA  조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: QnADTO,
    isPaging: true,
  })
  async getAnsweredQnAs(@ReqUser() user: RequestHost, @Param('spaceId') spaceId: string, @Paging() paging: PagingDTO) {
    return await this.qnaService.findPagingQnAs(paging, {
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
        answers: {
          some: {},
        },
      },
    });
  }

  @Get('/spaces/:spaceId/answered/count')
  @RequestApi({
    summary: {
      description: '답변 QnA 개수 조회',
      summary: '답변 QnA 개수  조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: QnADTO,
    isPaging: true,
  })
  async getAnsweredQnAsCount(@ReqUser() user: RequestHost, @Param('spaceId') spaceId: string) {
    return await this.qnaService.countQnA({
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
        answers: {
          some: {},
        },
      },
    });
  }

  @Post('/answer')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: 'QnA 답변 등록',
      summary: 'QnA 답변 등록 - 호스트만 사용 가능합니다.',
    },

    body: {
      type: CreateQnAAnswerDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createQnAAnswer(@ReqUser() user: RequestHost, @Body() body: CreateQnAAnswerDTO) {
    return await this.qnaService.createQnAAnswer(user.id, body);
  }

  @Post('/answer/:answerId')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: 'QnA 답변 등록',
      summary: 'QnA 답변 등록 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'answerId',
      type: 'string',
      required: true,
      description: 'QnA 답변 아이디',
    },
    body: {
      type: UpdateQnAAnswerDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateQnAAnswer(
    @Param('answerId') answerId: string,
    @ReqUser() user: RequestHost,
    @Body() body: CreateQnAAnswerDTO
  ) {
    return await this.qnaService.updateQnAAnswer(answerId, user.id, body);
  }

  @Delete('/answer/:answerId')
  @RequestApi({
    summary: {
      description: 'QnA 답변 삭제',
      summary: 'QnA 답변 삭제 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'answerId',
      type: 'string',
      required: true,
      description: 'QnA 답변 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteQnAAnswer(@Param('answerId') answerId: string, @ReqUser() user: RequestHost) {
    return await this.qnaService.deleteQnAAnswer(answerId, user.id);
  }
}
