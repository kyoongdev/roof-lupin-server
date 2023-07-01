import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestAdmin } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminService } from './admin.service';
import {
  AdminDTO,
  CheckAdminDTO,
  CreateAdminDTO,
  IsAdminCheckedDTO,
  UpdateAdminDTO,
  UpdateAdminPasswordDTO,
} from './dto';

@ApiController('', '통합관리자')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '통합관리자 목록 조회',
      summary: '통합관리자 목록 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: AdminDTO,
    isPaging: true,
  })
  async getAdmins(@Paging() paging: PagingDTO) {
    return await this.adminService.findPagingAdmins(paging);
  }

  @Get('me')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '통합관리자 내 정보 조회',
      summary: '통합관리자  내 정보 조회',
    },
  })
  @ResponseApi({
    type: AdminDTO,
  })
  async getMe(@ReqUser() user: RequestAdmin) {
    return await this.adminService.findAdmin(user.id);
  }

  @Get(':adminId/detail')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '통합관리자 조회',
      summary: '통합관리자  조회',
    },
    params: {
      type: 'string',
      name: 'adminId',
      description: '통합관리자 아이디',
    },
  })
  @ResponseApi({
    type: AdminDTO,
  })
  async getAdmin(@Param('adminId') adminId: string) {
    return await this.adminService.findAdmin(adminId);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '통합관리자 생성',
      summary: '통합관리자 생성',
    },
    body: {
      type: CreateAdminDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createAdmin(@Body() data: CreateAdminDTO) {
    return await this.adminService.createAdmin(data, true);
  }

  @Post('check')
  @RequestApi({
    summary: {
      description: '통합관리자 유저 id 존재 유무 파악',
      summary: '통합관리자 유저 id 존재 유무 파악',
    },
    body: {
      type: CheckAdminDTO,
    },
  })
  @ResponseApi(
    {
      type: IsAdminCheckedDTO,
    },
    200
  )
  async checkAdmin(@Body() data: CheckAdminDTO) {
    return await this.adminService.checkAdminWithUserId(data);
  }

  @Patch('reset/password')
  @RequestApi({
    summary: {
      description: '통합관리자 비밀번호 재설정',
      summary: '통합관리자 비밀번호 재설정',
    },
    body: {
      type: UpdateAdminPasswordDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async resetAdminPassword(@Body() data: UpdateAdminPasswordDTO) {
    await this.adminService.updateAdminPassword(data);
  }

  @Patch(':adminId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '통합관리자 수정',
      summary: '통합관리자 수정',
    },

    params: {
      type: 'string',
      name: 'adminId',
      description: '통합관리자 아이디',
    },
    body: {
      type: UpdateAdminDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAdmin(@Param('adminId') adminId: string, @Body() data: UpdateAdminDTO) {
    return await this.adminService.updateAdmin(adminId, data);
  }

  @Delete(':adminId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '통합관리자 삭제',
      summary: '통합관리자 삭제',
    },
    params: {
      type: 'string',
      name: 'adminId',
      description: '통합관리자 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAdmin(@Param('adminId') adminId: string) {
    return await this.adminService.deleteAdmin(adminId);
  }

  @Delete(':adminId/hard')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '통합관리자 삭제 [하드]',
      summary: '통합관리자 삭제 - 사용에 유의하세요.',
    },
    params: {
      type: 'string',
      name: 'adminId',
      description: '통합관리자 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async hardDeleteAdmin(@Param('adminId') adminId: string) {
    return await this.adminService.hardDeleteAdmin(adminId);
  }
}
