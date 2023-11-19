import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { MessageEvent } from '@/event/message';
import {
  CreateExhibitionDTO,
  CreateExhibitionSpaceDTO,
  ExhibitionDTO,
  UpdateExhibitionDTO,
  UpdateExhibitionSpaceDTO,
} from '@/modules/exhibition/dto';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { FileService } from '@/modules/file/file.service';

@Injectable()
export class AdminExhibitionService {
  constructor(
    private readonly exhibitionRepository: ExhibitionRepository,
    private readonly fileService: FileService,
    private readonly messageEvent: MessageEvent,
    private readonly database: PrismaService
  ) {}

  async findExhibition(id: string) {
    return await this.exhibitionRepository.findExhibition(id);
  }

  async findExhibitions() {
    return await this.exhibitionRepository.findExhibitions();
  }

  async findPagingExhibitions(paging: PagingDTO, args = {} as Prisma.ExhibitionFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.exhibitionRepository.countExhibitions({
      where: args.where,
    });
    const exhibitions = await this.exhibitionRepository.findExhibitions({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<ExhibitionDTO>(exhibitions, { paging, count });
  }

  async createExhibition(data: CreateExhibitionDTO) {
    const exhibitionId = await this.exhibitionRepository.createExhibition(data);

    const users = await this.database.user.findMany({
      where: {
        pushToken: {
          not: null,
        },
        setting: {
          isAlarmAccepted: true,
          isPushAccepted: true,
        },
      },
      select: {
        id: true,
        pushToken: true,
        setting: true,
      },
    });

    users
      .map((user) => ({
        pushToken: user.pushToken,
        userId: user.id,
        setting: user.setting,
      }))
      .map((user) => {
        this.messageEvent.createMarketingAlarm({
          ...user,
          title: data.title,
          exhibitionId,
          startAt: data.startAt,
        });
      });

    return exhibitionId;
  }

  async createExhibitionSpace(id: string, data: CreateExhibitionSpaceDTO) {
    await this.findExhibition(id);
    return await this.exhibitionRepository.createExhibitionSpace(id, data);
  }

  async updateExhibition(id: string, data: UpdateExhibitionDTO) {
    await this.findExhibition(id);
    if (data.images) {
      await Promise.all(
        data.images.map(async (image) => {
          await this.fileService.deleteFile(image);
        })
      );
    }
    await this.exhibitionRepository.updateExhibition(id, data);
  }

  async updateExhibitionSpace(id: string, data: UpdateExhibitionSpaceDTO) {
    await this.findExhibition(id);
    await this.exhibitionRepository.updateExhibitionSpace(id, data);
  }

  async deleteExhibition(id: string) {
    await this.findExhibition(id);
    await this.exhibitionRepository.hardDeleteExhibition(id);
  }

  async deleteExhibitionSpace(id: string, spaceId: string) {
    await this.findExhibition(id);
    await this.exhibitionRepository.deleteExhibitionSpace(id, spaceId);
  }
}
