import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateHomeImageDTO, CreateSloganDTO, HomeDTO, UpdateHomeImageDTO, UpdateSloganDTO } from './dto';
import { HomeService } from './home.service';

@ApiController('home', '로그인 홈 화면 (배경/슬로건)')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 (배경/슬로건) 조회',
      summary: '로그인 홈 화면 (배경/슬로건) 조회',
    },
  })
  @ResponseApi({ type: HomeDTO })
  async getHome() {
    return await this.homeService.findHome();
  }

  @Get('images/paging')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 페이징 조회 ',
      summary: '로그인 홈 화면 배경 이미지 페이징 조회 - 관리자만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({ type: HomeDTO })
  async getPagingHomeImages(@Paging() paging: PagingDTO) {
    return this.homeService.findPagingHomeImages(paging);
  }

  @Get('images/list')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 리스트 조회 ',
      summary: '로그인 홈 화면 배경 이미지 리스트 조회 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({ type: HomeDTO })
  async getHomeImages() {
    return this.homeService.findHomeImages();
  }

  @Post('images')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 생성',
      summary: '로그인 홈 화면 배경 이미지 생성 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateHomeImageDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createHomeImage(@Body() body: CreateHomeImageDTO) {
    return this.homeService.createHomeImage(body);
  }

  @Patch('images/:homeImageId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 수정',
      summary: '로그인 홈 화면 배경 이미지 수정 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'homeImageId',
      type: 'string',
      required: true,
      description: '홈 이미지 id',
    },
    body: {
      type: UpdateHomeImageDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateHomeImage(@Param('homeImageId') id: string, @Body() body: UpdateHomeImageDTO) {
    return this.homeService.updateHomeImage(id, body);
  }

  @Delete('images/:homeImageId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 수정',
      summary: '로그인 홈 화면 배경 이미지 수정 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'homeImageId',
      type: 'string',
      required: true,
      description: '홈 이미지 id',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteHomeImage(@Param('homeImageId') id: string) {
    return this.homeService.deleteHomeImage(id);
  }

  @Get('slogans/paging')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 슬로건 페이징 조회 ',
      summary: '로그인 홈 화면 슬로건 페이징 조회 - 관리자만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({ type: HomeDTO })
  async getPagingSlogans(@Paging() paging: PagingDTO) {
    return this.homeService.findPagingSlogans(paging);
  }

  @Get('slogans/list')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 슬로건 리스트 조회 ',
      summary: '로그인 홈 화면 슬로건 리스트 조회 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({ type: HomeDTO })
  async getSlogans() {
    return this.homeService.findSlogans();
  }

  @Post('slogans')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 슬로건 생성',
      summary: '로그인 홈 화면 슬로건 생성 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateSloganDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSlogan(@Body() body: CreateSloganDTO) {
    return this.homeService.createSlogan(body);
  }

  @Patch('slogans/:sloganId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 슬로건 수정',
      summary: '로그인 홈 화면 슬로건 수정 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'sloganId',
      type: 'string',
      required: true,
      description: '슬로건 id',
    },
    body: {
      type: UpdateSloganDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateSlogan(@Param('sloganId') id: string, @Body() body: UpdateSloganDTO) {
    return this.homeService.updateSlogan(id, body);
  }

  @Delete('slogans/:sloganId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 슬로건 수정',
      summary: '로그인 홈 화면 슬로건 수정 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'sloganId',
      type: 'string',
      required: true,
      description: '슬로건 id',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteSlogan(@Param('sloganId') id: string) {
    return this.homeService.deleteSlogan(id);
  }
}
