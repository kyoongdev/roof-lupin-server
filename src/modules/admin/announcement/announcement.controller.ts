import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, JwtAuthGuard, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '../dto/announcement';

import { AdminAnnouncementService } from './announcement.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('announcements', '[관리자] 공지사항')
export class AdminAnnouncementController {
  constructor(private readonly announcementService: AdminAnnouncementService) {}

  @Get(':announcementId/detail')
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
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공지사항 생성',
      summary: '공지사항 생성 ',
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
  @RequestApi({
    summary: {
      description: '공지사항 수정',
      summary: '공지사항 수정 ',
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
  @RequestApi({
    summary: {
      description: '공지사항 삭제',
      summary: '공지사항 삭제 ',
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
