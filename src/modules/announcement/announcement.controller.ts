import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AnnouncementService } from './announcement.service';
import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from './dto';

@ApiController('announcements', '공지사항')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get(':announcementId')
  @RequestApi({
    summary: {
      description: '공지사항 조회',
      summary: '공지사항 조회',
    },
    params: {
      name: 'announcementId',
      description: '공지사항 아이디',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi({
    type: AnnouncementDTO,
  })
  async getAnnouncement(@Param('announcementId') id: string) {
    return await this.announcementService.findAnnouncement(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '공지사항 목록 조회',
      summary: '공지사항 목록 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: AnnouncementDTO,
    isPaging: true,
  })
  async getAnnouncements(@Paging() paging: PagingDTO) {
    return await this.announcementService.findPagingAnnouncements(paging);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공지사항 생성',
      summary: '공지사항 생성 - 관리자만 사용가능합니다.',
    },
    body: {
      type: CreateAnnouncementDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createAnnouncement(@Body() data: CreateAnnouncementDTO) {
    return await this.announcementService.createAnnouncement(data);
  }

  @Patch(':announcementId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공지사항 수정',
      summary: '공지사항 수정 - 관리자만 사용가능합니다.',
    },
    params: {
      name: 'announcementId',
      description: '공지사항 아이디',
      required: true,
      type: 'string',
    },
    body: {
      type: UpdateAnnouncementDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAnnouncement(@Param('announcementId') id: string, @Body() data: UpdateAnnouncementDTO) {
    return await this.announcementService.updateAnnouncement(id, data);
  }

  @Delete(':announcementId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공지사항 삭제',
      summary: '공지사항 삭제 - 관리자만 사용가능합니다.',
    },
    params: {
      name: 'announcementId',
      description: '공지사항 아이디',
      required: true,
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAnnouncement(@Param('announcementId') id: string) {
    return await this.announcementService.deleteAnnouncement(id);
  }
}
