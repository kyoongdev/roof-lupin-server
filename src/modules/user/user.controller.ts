import { Body, Get, Post } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { CreateUserDTO } from './dto';
import { CommonUserDTO } from './dto/common-user.dto';

@ApiController('user', '유저')
export class UserController {
  @Get('')
  @RequestApi({})
  @ResponseApi({})
  getUsers() {
    return [];
  }

  @Post('')
  @RequestApi({
    body: {
      type: CreateUserDTO,
    },
  })
  @ResponseApi({})
  createUser(@Body() body: CreateUserDTO) {
    return [];
  }
}
