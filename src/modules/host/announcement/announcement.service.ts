import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { AnnouncementRepository } from '@/modules/admin/announcement/announcement.repository';
import { AnnouncementDTO } from '@/modules/admin/dto/announcement';

@Injectable()
export class HostAnnouncementService {
  constructor(private readonly announcementRepository: AnnouncementRepository) {}

  async findAnnouncement(id: string) {
    return await this.announcementRepository.findAnnouncement(id);
  }

  async findAnnouncements(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.announcementRepository.countAnnouncements();

    const announcements = await this.announcementRepository.findAnnouncements({
      where: {
        deletedAt: null,
      },
      skip,
      take,
    });

    return new PaginationDTO<AnnouncementDTO>(announcements, { count, paging });
  }
}
