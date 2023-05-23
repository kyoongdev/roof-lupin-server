import { Controller, Get } from '@nestjs/common';
import { RequestApi, ResponseApi } from 'wemacu-nestjs';

@Controller('user')
export class UserController {
  @Get('')
  @RequestApi({})
  @ResponseApi({})
  getUsers() {
    return [];
  }
}
