import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '../dto/announcement';

import { AnnouncementRepository } from './announcement.repository';

@Injectable()
export class AdminAnnouncementService {
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

  async createAnnouncement(data: CreateAnnouncementDTO) {
    return await this.announcementRepository.createAnnouncement(data);
  }
  async updateAnnouncement(id: string, data: UpdateAnnouncementDTO) {
    await this.findAnnouncement(id);
    await this.announcementRepository.updateAnnouncement(id, data);
  }

  async deleteAnnouncement(id: string) {
    await this.findAnnouncement(id);
    await this.announcementRepository.hardDeleteAnnouncement(id);
  }
}
