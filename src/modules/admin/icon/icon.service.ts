import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { FileService } from '@/modules/file/file.service';

import { IconRepository } from './icon.repository';

@Injectable()
export class AdminIconService {
  constructor(private readonly iconRepository: IconRepository, private readonly fileService: FileService) {}

  async findIcon(id: string) {
    return await this.iconRepository.findIcon(id);
  }

  async findIcons(args = {} as Prisma.IconFindManyArgs) {
    const icons = await this.iconRepository.findIcons(args);

    return icons;
  }

  async createIcon(file: Express.Multer.File, name: string) {
    const isSvg = file.mimetype === 'image/svg+xml';
    const { url } = isSvg ? await this.fileService.uploadIcon(file) : await this.fileService.uploadFile(file);
    return await this.iconRepository.createIcon(url, { name });
  }

  async deleteIcon(id: string) {
    await this.findIcon(id);

    return await this.iconRepository.deleteIcon(id);
  }
}
