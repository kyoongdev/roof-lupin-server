import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from './dto';
import { AnnouncementException } from './exception/announcement.exception';
import { ANNOUNCEMENT_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class AnnouncementService {
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

  async findPagingAnnouncements(paging: PagingDTO, args = {} as Prisma.AnnouncementFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.countAnnouncements({
      where: args.where,
    });
    const announcements = await this.findAnnouncements({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<AnnouncementDTO>(announcements, { count, paging });
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
    await this.findAnnouncement(id);

    await this.database.announcement.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAnnouncement(id: string) {
    await this.findAnnouncement(id);

    await this.database.announcement.delete({
      where: {
        id,
      },
    });
  }
}
