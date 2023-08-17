import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { FileService } from '@/modules/file/file.service';

import { AdminException } from '../exception/admin.exception';
import { ADMIN_ERROR_CODE, ADMIN_ICON_IN_USE } from '../exception/errorCode';

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
    const icon = await this.findIcon(id);

    if (icon.inUse) {
      throw new AdminException(ADMIN_ERROR_CODE.CONFLICT(ADMIN_ICON_IN_USE));
    }

    await this.fileService.deleteFile(icon.url);
    return await this.iconRepository.deleteIcon(id);
  }
}
