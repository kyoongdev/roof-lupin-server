import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { AnnouncementDTO } from '@/modules/admin/dto/announcement';
import { ApiController, JwtAuthGuard } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostAnnouncementService } from './announcement.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('announcements', '[호스트] 공지사항')
export class HostAnnouncementController {
  constructor(private readonly announcementService: HostAnnouncementService) {}

  @Get(':announcementId/detail')
  @RequestApi({
    summary: {
      summary: '공지사항 상세',
      description: '공지사항 상세',
    },
  })
  @ResponseApi({
    type: AnnouncementDTO,
  })
  async findAnnouncement(@Param('announcementId') id: string) {
    return await this.announcementService.findAnnouncement(id);
  }

  @Get()
  @RequestApi({
    summary: {
      summary: '공지사항 목록',
      description: '공지사항 목록',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: AnnouncementDTO,
    isPaging: true,
  })
  async findAnnouncements(@Paging() paging: PagingDTO) {
    return await this.announcementService.findAnnouncements(paging);
  }
}
