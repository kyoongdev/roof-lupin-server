import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { IconDTO } from '../dto/icon';
import { CreateIconDTO } from '../dto/icon/create-icon.dto';
import { AdminException } from '../exception/admin.exception';
import { ADMIN_ERROR_CODE, ADMIN_ICON_NOT_FOUND } from '../exception/errorCode';

@Injectable()
export class IconRepository {
  constructor(private readonly database: PrismaService) {}

  async findIcon(id: string) {
    const icon = await this.database.icon.findUnique({
      where: {
        id,
      },
    });

    if (!icon) {
      throw new AdminException(ADMIN_ERROR_CODE.NOT_FOUND(ADMIN_ICON_NOT_FOUND));
    }

    return new IconDTO(icon);
  }

  async countIcons(args = {} as Prisma.IconCountArgs) {
    return await this.database.icon.count(args);
  }

  async findIcons(args = {} as Prisma.IconFindManyArgs) {
    const icons = await this.database.icon.findMany(args);

    return icons.map((icon) => new IconDTO(icon));
  }

  async createIcon(url: string, data: CreateIconDTO) {
    const icon = await this.database.icon.create({
      data: {
        url,
        name: data.name,
      },
    });

    return icon.id;
  }

  async deleteIcon(id: string) {
    await this.database.icon.delete({
      where: {
        id,
      },
    });
  }
}
