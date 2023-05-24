import { Get } from '@nestjs/common';
import { ApiController } from 'utils';
import { RequestApi, ResponseApi } from 'wemacu-nestjs';

@ApiController('user', '유저')
export class UserController {
  @Get('')
  @RequestApi({})
  @ResponseApi({})
  getUsers() {
    return [];
  }
}
