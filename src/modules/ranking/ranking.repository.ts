import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import { CreateRankingDTO, RankingDTO, UpdateRankingDTO } from './dto';
import { RANKING_ERROR_CODE, RANKING_NOT_FOUND } from './exception/errorCode';
import { RankingException } from './exception/ranking.exception';

@Injectable()
export class RankingRepository {
  constructor(private readonly database: PrismaService) {}

  async findRanking(id: string) {
    const ranking = await this.database.ranking.findUnique({
      where: {
        id,
      },
      include: {
        spaces: {
          include: {
            space: {
              include: {
                location: true,
                reviews: true,
                publicTransportations: true,
                userInterests: true,
                rentalType: true,
              },
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
    });

    if (!ranking) {
      throw new RankingException(RANKING_ERROR_CODE.NOT_FOUND(RANKING_NOT_FOUND));
    }

    return new RankingDTO({
      ...ranking,
      spaces: ranking.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
    });
  }

  async countRankings(args = {} as Prisma.RankingCountArgs) {
    return await this.database.ranking.count(args);
  }

  async findRankings(args = {} as Prisma.RankingFindManyArgs) {
    const rankings = await this.database.ranking.findMany({
      ...args,
      where: args.where,
      include: {
        spaces: {
          include: {
            space: {
              include: {
                location: true,
                reviews: true,
                publicTransportations: true,
                userInterests: true,
                rentalType: true,
              },
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
    });

    return rankings.map(
      (ranking) =>
        new RankingDTO({
          ...ranking,
          spaces: ranking.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
        })
    );
  }

  async createRanking(data: CreateRankingDTO) {
    const { spaces, ...rest } = data;
    const ranking = await this.database.ranking.create({
      data: {
        ...rest,
        spaces: {
          create: spaces.map((space) => ({
            orderNo: space.orderNo,
            space: {
              connect: {
                id: space.spaceId,
              },
            },
          })),
        },
      },
    });
    return ranking.id;
  }

  async updateRanking(id: string, data: UpdateRankingDTO) {
    const { spaces, ...rest } = data;
    await this.database.ranking.update({
      where: {
        id,
      },
      data: {
        ...rest,
        ...(spaces && {
          spaces: {
            deleteMany: {},
            create: spaces.map((space) => ({
              orderNo: space.orderNo,
              space: {
                connect: {
                  id: space.spaceId,
                },
              },
            })),
          },
        }),
      },
    });
  }

  async deleteRanking(id: string) {
    await this.database.ranking.delete({
      where: {
        id,
      },
    });
  }
}
