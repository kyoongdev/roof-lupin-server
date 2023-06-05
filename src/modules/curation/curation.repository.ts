import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateCurationDTO, CurationDetailDTO, CurationDTO, UpdateCurationDTO } from './dto';
import { CurationException } from './exception/curation.exception';
import { CURATION_ERROR_CODE, CURATION_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class CurationRepository {
  constructor(private readonly database: PrismaService) {}

  async findCuration(id: string) {
    const curation = await this.database.curation.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!curation) {
      throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_NOT_FOUND));
    }
    return new CurationDetailDTO(curation);
  }

  async findCurations(args = {} as Prisma.CurationFindManyArgs) {
    const curations = await this.database.curation.findMany({
      where: args.where,
      orderBy: { createdAt: 'desc', ...args.orderBy },
      ...args,
    });
    return curations.map((curation) => new CurationDTO(curation));
  }

  async countCurations(args = {} as Prisma.CurationCountArgs) {
    return await this.database.curation.count(args);
  }

  async createCuration(userId: string, data: CreateCurationDTO) {
    const curation = await this.database.curation.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...data,
      },
    });

    return curation.id;
  }

  async updateCuration(id: string, data: UpdateCurationDTO) {
    await this.database.curation.update({
      where: { id },
      data,
    });
  }

  async deleteCuration(id: string) {
    await this.database.curation.delete({
      where: { id },
    });
  }
}
