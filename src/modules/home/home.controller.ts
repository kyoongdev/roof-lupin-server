import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateHomeContentsDTO, HomeContentsDTO, UpdateHomeContentsDTO } from './dto';
import { HomeService } from './home.service';

@ApiController('home', '홈 화면 컨텐츠')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('contents')
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
  async getHomeContents() {
    return await this.homeService.getHomeContents();
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
