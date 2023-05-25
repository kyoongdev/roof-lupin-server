import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PagingDTO } from 'wemacu-nestjs';
import { AdminException } from './exception/host.exception';
import { ADMIN_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class AdminRepository {
  constructor(private readonly database: PrismaService) {}

  async findAdmins(args = {} as Prisma.AdminFindManyArgs) {
    const admins = await this.database.admin.findMany(args);

    return admins;
  }

  async findPagingAdmins(paging: PagingDTO, args = {} as Prisma.AdminFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.admin.count({
      where: args.where,
    });
    const rows = await this.database.admin.findMany({
      where: {
        ...args.where,
      },
      skip,
      take,
    });

    return { count, rows };
  }

  async findAdmin(id: string) {
    const admin = await this.database.admin.findUnique({
      where: {
        id,
      },
    });
    if (!admin) {
      throw new AdminException(ADMIN_ERROR_CODE.NOT_FOUND);
    }

    return admin;
  }
}
