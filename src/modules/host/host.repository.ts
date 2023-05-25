import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PagingDTO } from 'wemacu-nestjs';
import { HostException } from './exception/host.exception';
import { HOST_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class HostRepository {
  constructor(private readonly database: PrismaService) {}

  async findHosts(args = {} as Prisma.HostFindManyArgs) {
    const hosts = await this.database.host.findMany(args);

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
      throw new HostException(HOST_ERROR_CODE.NOT_FOUND);
    }

    return host;
  }
}
