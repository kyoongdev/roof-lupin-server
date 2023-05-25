import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PagingDTO } from 'wemacu-nestjs';
import { SpaceException } from './exception/space.exception';
import { SPACE_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService) {}

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    const spaces = await this.database.space.findMany(args);

    return spaces;
  }

  async findPagingSpaces(paging: PagingDTO, args = {} as Prisma.SpaceFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.space.count({
      where: args.where,
    });
    const rows = await this.database.space.findMany({
      where: {
        ...args.where,
      },
      skip,
      take,
    });

    return { count, rows };
  }

  async findSpace(id: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND);
    }

    return space;
  }
}
