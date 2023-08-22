import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { AnnouncementException } from '@/modules/announcement/exception/announcement.exception';
import { ANNOUNCEMENT_ERROR_CODE } from '@/modules/announcement/exception/errorCode';

import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '../dto/announcement';

@Injectable()
export class AnnouncementRepository {
  constructor(private readonly database: PrismaService) {}

  async findAnnouncement(id: string) {
    const announcement = await this.database.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      throw new AnnouncementException(ANNOUNCEMENT_ERROR_CODE.NOT_FOUND());
    }

    return new AnnouncementDTO(announcement);
  }

  async findAnnouncements(args = {} as Prisma.AnnouncementFindManyArgs) {
    const announcements = await this.database.announcement.findMany({
      ...args,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    });

    return announcements.map((announcement) => new AnnouncementDTO(announcement));
  }

  async countAnnouncements(args = {} as Prisma.AnnouncementCountArgs) {
    return this.database.announcement.count(args);
  }

  async createAnnouncement(data: CreateAnnouncementDTO) {
    const announcement = await this.database.announcement.create({
      data,
    });

    return announcement.id;
  }

  async updateAnnouncement(id: string, data: UpdateAnnouncementDTO) {
    await this.database.announcement.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAnnouncement(id: string) {
    await this.database.announcement.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteAnnouncement(id: string) {
    await this.database.announcement.delete({
      where: {
        id,
      },
    });
  }
}
