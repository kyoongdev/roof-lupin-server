import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { IconDetailDTO, IconDTO } from '../dto/icon';
import { CreateIconDTO } from '../dto/icon/create-icon.dto';
import { AdminException } from '../exception/admin.exception';
import { ADMIN_ERROR_CODE } from '../exception/errorCode';

@Injectable()
export class IconRepository {
  constructor(private readonly database: PrismaService) {}

  async findIcon(id: string) {
    const icon = await this.database.icon.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            building: true,
            categoryIcon: true,
            serviceIcons: true,
          },
        },
      },
    });

    if (!icon) {
      throw new AdminException(ADMIN_ERROR_CODE.ADMIN_ICON_NOT_FOUND);
    }

    return new IconDetailDTO({
      ...icon,
      inUse: icon._count.building > 0 || icon._count.categoryIcon > 0 || icon._count.serviceIcons > 0,
    });
  }

  async countIcons(args = {} as Prisma.IconCountArgs) {
    return await this.database.icon.count(args);
  }

  async findIcons(args = {} as Prisma.IconFindManyArgs) {
    const icons = await this.database.icon.findMany({
      ...args,
      include: {
        _count: {
          select: {
            building: true,
            categoryIcon: true,
            serviceIcons: true,
          },
        },
      },
    });

    return await Promise.all(
      icons.map(
        async (icon) =>
          new IconDTO({
            ...icon,
            inUse: icon._count.building > 0 || icon._count.categoryIcon > 0 || icon._count.serviceIcons > 0,
          })
      )
    );
  }

  async createIcon(url: string, data: CreateIconDTO) {
    const icon = await this.database.icon.create({
      data: {
        url,
        name: data.name,
      },
    });

    return icon;
  }

  async deleteIcon(id: string) {
    await this.database.icon.update({
      where: {
        id,
      },
      data: {
        building: {
          set: [],
        },
        categoryIcon: {
          set: [],
        },
        serviceIcons: {
          set: [],
        },
      },
    });
  }

  async hardDeleteIcon(id: string) {
    await this.database.icon.delete({
      where: {
        id,
      },
    });
  }
}
