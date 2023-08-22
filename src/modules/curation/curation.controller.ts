import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';

import { CurationService } from './curation.service';
import { CreateCurationDTO, CurationDetailDTO, CurationDTO, UpdateCurationDTO } from './dto';

@ApiController('curations', '큐레이션')
export class CurationController {
  constructor(private readonly curationService: CurationService) {}

  @Get(':curationId/detail')
  @RequestApi({
    summary: {
      description: '큐레이션 상세 조회',
      summary: '큐레이션 상세 조회',
    },
    params: {
      name: 'curationId',
      description: '큐레이션 아이디',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi({
    type: CurationDetailDTO,
  })
  async getCurationDetail(@Param('curationId') id: string) {
    return await this.curationService.findCuration(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '큐레이션 목록 조회',
      summary: '큐레이션 목록 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: CurationDTO,
    isPaging: true,
  })
  async getPagingCuration(@Paging() paging: PagingDTO) {
    return await this.curationService.findPagingCurations(paging);
  }

  @Post()
  @Auth([JwtAuthGuard])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '큐레이션 등록',
      summary: '큐레이션 등록 - 유저만 사용 가능합니다.',
    },
    body: {
      type: CreateCurationDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createCuration(@Body() body: CreateCurationDTO) {
    return await this.curationService.createCuration(body);
  }

  @Patch(':curationId')
  @Auth([JwtAuthGuard])
  @RequestApi({
    summary: {
      description: '큐레이션 수정',
      summary: '큐레이션 수정 - 유저만 사용 가능합니다.',
    },
    params: {
      name: 'curationId',
      type: 'string',
      required: true,
      description: '큐레이션 아이디',
    },
    body: {
      type: UpdateCurationDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateCuration(@Param('curationId') id: string, @Body() body: UpdateCurationDTO) {
    return await this.curationService.updateCuration(id, body);
  }

  @Delete(':curationId')
  @Auth([JwtAuthGuard])
  @RequestApi({
    summary: {
      description: '큐레이션 삭제',
      summary: '큐레이션 삭제 - 유저만 사용 가능합니다.',
    },
    params: {
      name: 'curationId',
      type: 'string',
      required: true,
      description: '큐레이션 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteCuration(@Param('curationId') id: string) {
    return await this.curationService.deleteCuration(id);
  }
}
