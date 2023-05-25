import { Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

@ApiController('user', '유저')
export class UserController {
  @Get('')
  @RequestApi({})
  @ResponseApi({})
  getUsers() {
    return [];
  }
}
