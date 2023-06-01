import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { HOST_ERROR_CODE } from './exception/errorCode';
import { HostException } from './exception/host.exception';

@Injectable()
export class HostRepository {
  constructor(private readonly database: PrismaService) {}

  async findHosts(args = {} as Prisma.HostFindManyArgs) {
    const hosts = await this.database.host.findMany({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    });

    return hosts;
  }

  async findPagingHosts(paging: PagingDTO, args = {} as Prisma.HostFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.host.count({
      where: args.where,
    });
    const rows = await this.database.host.findMany({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip,
      take,
    });

    return { count, rows };
  }

  async findHost(id: string) {
    const host = await this.database.host.findUnique({
      where: {
        id,
      },
    });
    if (!host) {
      throw new HostException(HOST_ERROR_CODE.NOT_FOUND());
    }

    return host;
  }
}
