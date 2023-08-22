import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { AnnouncementRepository } from '../admin/announcement/announcement.repository';
import { AnnouncementDTO } from '../admin/dto/announcement';

@Injectable()
export class AnnouncementService {
  constructor(private readonly announcementRepository: AnnouncementRepository) {}

  async findAnnouncement(id: string) {
    return await this.announcementRepository.findAnnouncement(id);
  }

  async findPagingAnnouncements(paging: PagingDTO, args = {} as Prisma.AnnouncementFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.announcementRepository.countAnnouncements({
      where: args.where,
    });
    const announcements = await this.announcementRepository.findAnnouncements({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<AnnouncementDTO>(announcements, { count, paging });
  }

  async findAnnouncements(args = {} as Prisma.AnnouncementFindManyArgs) {
    return await this.announcementRepository.findAnnouncements(args);
  }
}
