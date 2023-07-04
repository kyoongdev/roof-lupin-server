import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { CreateCache } from '@/utils/cache';
import { JwtAuthGuard, JwtNullableAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CategoryService } from '../category/category.service';
import { CategoryDTO } from '../category/dto';
import { CurationService } from '../curation/curation.service';
import { CurationDTO } from '../curation/dto';

import { HOME_CATEGORY_CACHE, HOME_CURATION_CACHE } from './cache';
import { CreateHomeContentsDTO, HomeContentsDTO, UpdateHomeContentsDTO } from './dto';
import { HomeService } from './home.service';

@ApiController('home', '홈 화면 컨텐츠')
@UseInterceptors(CacheInterceptor)
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly curationService: CurationService,
    private readonly categoryService: CategoryService
  ) {}

  @Get('contents')
  @Auth([JwtNullableAuthGuard])
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠를 가져옵니다.',
      summary: '홈 화면 컨텐츠를 가져옵니다.',
    },
  })
  @ResponseApi({
    type: HomeContentsDTO,
    isArray: true,
  })
  async getHomeContents(@ReqUser() user?: RequestUser) {
    return await this.homeService.getHomeContents(user?.id);
  }

  @Get('curations')
  @CreateCache({ key: HOME_CURATION_CACHE.KEY, ttl: HOME_CURATION_CACHE.TTL })
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

  @Get('categories')
  @CreateCache({ key: HOME_CATEGORY_CACHE.KEY, ttl: HOME_CATEGORY_CACHE.TTL })
  @RequestApi({
    summary: {
      description: '홈 카테고리 리스트 조회',
      summary: '홈 카테고리 리스트 조회',
    },
  })
  @ResponseApi({
    type: CategoryDTO,
    isArray: true,
  })
  async getHomeCategories() {
    return await this.categoryService.findCategories({
      where: {
        isHome: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Post('contents')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠를 생성합니다.',
      summary: '홈 화면 컨텐츠를 생성합니다. - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateHomeContentsDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createHomeContents(@Body() body: CreateHomeContentsDTO) {
    return await this.homeService.createHomeContents(body);
  }

  @Patch('contents/:contentId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠를 수정합니다.',
      summary: '홈 화면 컨텐츠를 수정합니다. - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'contentId',
      description: '홈 화면 컨텐츠 id',
      type: 'string',
    },
    body: {
      type: UpdateHomeContentsDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateHomeContents(@Param('contentId') id: string, @Body() body: UpdateHomeContentsDTO) {
    await this.homeService.updateHomeContents(id, body);
  }

  @Delete('contents/:contentId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠를 삭제합니다.',
      summary: '홈 화면 컨텐츠를 삭제합니다. - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'contentId',
      description: '홈 화면 컨텐츠 id',
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteHomeContents(@Param('contentId') id: string) {
    await this.homeService.deleteHomeContents(id);
  }
}
