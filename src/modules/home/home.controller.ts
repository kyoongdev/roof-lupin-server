import { CacheInterceptor } from '@nestjs/cache-manager';
import { Get, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtNullableAuthGuard } from '@/utils/guards';

import { CategoryService } from '../category/category.service';
import { CategoryDTO } from '../category/dto';
import { CurationService } from '../curation/curation.service';
import { CurationDTO } from '../curation/dto';

import { HomeContentsDTO } from './dto';
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
}
