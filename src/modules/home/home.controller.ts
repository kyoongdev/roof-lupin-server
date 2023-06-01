import { Controller, Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { HomeDTO } from './dto';
import { HomeService } from './home.service';

@ApiController('home', '로그인 홈 화면 (배경/슬로건)')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @RequestApi({})
  @ResponseApi({ type: HomeDTO })
  async getHome() {
    return await this.homeService.findHome();
  }
}
