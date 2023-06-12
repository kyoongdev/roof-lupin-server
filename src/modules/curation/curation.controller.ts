import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

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

  @Get('home')
  @RequestApi({
    summary: {
      description: '홈 화면 큐레이션 목록 조회',
      summary: '홈 화면 큐레이션 목록 조회',
    },
  })
  @ResponseApi({
    type: CurationDTO,
    isArray: true,
  })
  async getHomeCuration() {
    return await this.curationService.findCurations({
      where: { isMain: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  async createCuration(@ReqUser() user: RequestUser, @Body() body: CreateCurationDTO) {
    return await this.curationService.createCuration(user.id, body);
  }

  @Patch(':curationId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  async updateCuration(@Param('curationId') id: string, @ReqUser() user: RequestUser, @Body() body: UpdateCurationDTO) {
    return await this.curationService.updateCuration(id, user.id, body);
  }

  @Delete(':curationId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
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
  async deleteCuration(@Param('curationId') id: string, @ReqUser() user: RequestUser) {
    return await this.curationService.deleteCuration(id, user.id);
  }
}
