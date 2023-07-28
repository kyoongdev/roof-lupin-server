import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { FileService } from '@/modules/file/file.service';

import { IconDTO } from '../dto/icon';

import { IconRepository } from './icon.repository';

@Injectable()
export class AdminIconService {
  constructor(private readonly iconRepository: IconRepository, private readonly fileService: FileService) {}

  async findIcon(id: string) {
    return await this.iconRepository.findIcon(id);
  }

  async findPagingIcons(paging: PagingDTO, args = {} as Prisma.IconFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.iconRepository.countIcons({ where: args.where });
    const icons = await this.iconRepository.findIcons({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<IconDTO>(icons, { count, paging });
  }

  async createIcon(file: Express.Multer.File, name: string) {
    const { url } = await this.fileService.uploadIcon(file);
    return await this.iconRepository.createIcon(url, { name });
  }

  async deleteIcon(id: string) {
    const icon = await this.findIcon(id);
    await this.fileService.deleteFile(icon.url);
    return await this.iconRepository.deleteIcon(id);
  }
}
