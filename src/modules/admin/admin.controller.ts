import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminService } from './admin.service';
import { AdminDTO, CreateAdminDTO, UpdateAdminDTO } from './dto';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins', '통합관리자')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
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
  async findAdmins(@Paging() paging: PagingDTO) {
    return await this.adminService.findPagingAdmins(paging);
  }

  @Get(':adminId/detail')
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
  async findAdmin(@Param('adminId') adminId: string) {
    return await this.adminService.findAdmin(adminId);
  }

  @Post('')
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

  @Patch(':adminId')
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
