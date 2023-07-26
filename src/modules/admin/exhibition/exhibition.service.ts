import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import {
  CreateExhibitionDTO,
  CreateExhibitionSpaceDTO,
  ExhibitionDTO,
  UpdateExhibitionDTO,
  UpdateExhibitionOrderDTO,
  UpdateExhibitionSpaceDTO,
} from '@/modules/exhibition/dto';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { FileService } from '@/modules/file/file.service';

@Injectable()
export class AdminExhibitionService {
  constructor(private readonly exhibitionRepository: ExhibitionRepository, private readonly fileService: FileService) {}

  async findExhibition(id: string) {
    return await this.exhibitionRepository.findExhibition(id);
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
    return await this.exhibitionRepository.createExhibition(data);
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

  async updateExhibitionOrder(id: string, data: UpdateExhibitionOrderDTO) {
    await this.findExhibition(id);
    await this.exhibitionRepository.updateExhibitionOrder(id, data);
  }

  async updateExhibitionSpace(id: string, data: UpdateExhibitionSpaceDTO) {
    await this.findExhibition(id);
    await this.exhibitionRepository.updateExhibitionSpace(id, data);
  }

  async deleteExhibition(id: string) {
    await this.findExhibition(id);
    await this.exhibitionRepository.deleteExhibition(id);
  }

  async deleteExhibitionOrder(id: string) {
    await this.exhibitionRepository.deleteExhibitionOrder(id);
  }

  async deleteExhibitionSpace(id: string, spaceId: string) {
    await this.findExhibition(id);
    await this.exhibitionRepository.deleteExhibitionSpace(id, spaceId);
  }
}
