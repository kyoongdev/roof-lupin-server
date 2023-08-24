import { Get, Param } from '@nestjs/common';

import { Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { AnnouncementDTO } from '../admin/dto/announcement';

import { AnnouncementService } from './announcement.service';

@ApiController('announcements', '공지사항')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

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
}
