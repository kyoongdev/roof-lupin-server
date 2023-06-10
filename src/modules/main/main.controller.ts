import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateMainImageDTO, CreateSloganDTO, MainDTO, UpdateMainImageDTO, UpdateSloganDTO } from './dto';
import { MainService } from './main.service';

@ApiController('main', '로그인 화면 (배경/슬로건)')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 (배경/슬로건) 조회',
      summary: '로그인 홈 화면 (배경/슬로건) 조회',
    },
  })
  @ResponseApi({ type: MainDTO })
  async getMain() {
    return await this.mainService.findMain();
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
  @ResponseApi({ type: MainDTO })
  async getPagingMainImages(@Paging() paging: PagingDTO) {
    return this.mainService.findPagingMainImages(paging);
  }

  @Get('images/list')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 리스트 조회 ',
      summary: '로그인 홈 화면 배경 이미지 리스트 조회 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({ type: MainDTO })
  async getMainImages() {
    return this.mainService.findMainImages();
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
      type: CreateMainImageDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createMainImage(@Body() body: CreateMainImageDTO) {
    return this.mainService.createMainImage(body);
  }

  @Patch('images/:mainImageId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 수정',
      summary: '로그인 홈 화면 배경 이미지 수정 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'mainImageId',
      type: 'string',
      required: true,
      description: '홈 이미지 id',
    },
    body: {
      type: UpdateMainImageDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMainImage(@Param('mainImageId') id: string, @Body() body: UpdateMainImageDTO) {
    return this.mainService.updateMainImage(id, body);
  }

  @Delete('images/:mainImageId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 배경 이미지 수정',
      summary: '로그인 홈 화면 배경 이미지 수정 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'mainImageId',
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
  async deleteMainImage(@Param('mainImageId') id: string) {
    return this.mainService.deleteMainImage(id);
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
  @ResponseApi({ type: MainDTO })
  async getPagingSlogans(@Paging() paging: PagingDTO) {
    return this.mainService.findPagingSlogans(paging);
  }

  @Get('slogans/list')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '로그인 홈 화면 슬로건 리스트 조회 ',
      summary: '로그인 홈 화면 슬로건 리스트 조회 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({ type: MainDTO })
  async getSlogans() {
    return this.mainService.findSlogans();
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
    return this.mainService.createSlogan(body);
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
    return this.mainService.updateSlogan(id, body);
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
    return this.mainService.deleteSlogan(id);
  }
}
