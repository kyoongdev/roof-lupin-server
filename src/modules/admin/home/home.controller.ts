import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateHomeContentsDTO, UpdateHomeContentsDTO } from '@/modules/home/dto';
import { ApiController, JwtAuthGuard, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminHomeContentDTO } from '../dto/home';

import { AdminHomeService } from './home.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('home', '[관리자] 홈 화면 관리')
export class AdminHomeController {
  constructor(private readonly homeService: AdminHomeService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠 불러오기',
      summary: '홈 화면 컨텐츠 불러오기',
    },
  })
  @ResponseApi({
    type: AdminHomeContentDTO,
    isArray: true,
  })
  async getHomeContents() {
    return await this.homeService.findHomeContents();
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠 생성하기',
      summary: '홈 화면 컨텐츠 생성하기',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createHomeContent(@Body() body: CreateHomeContentsDTO) {
    return await this.homeService.createHomeContent(body);
  }

  @Patch(':homeContentId')
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠 수정하기',
      summary: '홈 화면 컨텐츠 수정하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateHomeContent(@Param('homeContentId') id: string, @Body() body: UpdateHomeContentsDTO) {
    await this.homeService.updateHomeContent(id, body);
  }

  @Delete(':homeContentId')
  @RequestApi({
    summary: {
      description: '홈 화면 컨텐츠 삭제하기',
      summary: '홈 화면 컨텐츠 삭제하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteHomeContent(@Param('homeContentId') id: string) {
    await this.homeService.deleteHomeContent(id);
  }
}
