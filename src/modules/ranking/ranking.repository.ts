import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import { CreateRankingDTO, CreateRankingSpaceDTO, RankingDTO, RankingIdsDTO, UpdateRankingDTO } from './dto';
import { RANKING_ERROR_CODE, RANKING_NOT_FOUND, RANKING_SPACE_NOT_FOUND } from './exception/errorCode';
import { RankingException } from './exception/ranking.exception';

@Injectable()
export class RankingRepository {
  constructor(private readonly database: PrismaService) {}

  async findRankingIds() {
    const id = await this.database.ranking.findMany({
      select: {
        id: true,
      },
    });
    return new RankingIdsDTO({ ids: id.map((id) => id.id) });
  }

  async findRanking(id: string, args = {} as Prisma.Ranking$spacesArgs) {
    const ranking = await this.database.ranking.findUnique({
      where: {
        id,
      },
      include: {
        spaces: {
          ...args,
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
  async countRankingSpaces(rankingId: string) {
    return await this.database.rankingSpaces.count({
      where: {
        rankingId,
      },
    });
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

  async createRankingSpace(rankingId: string, data: CreateRankingSpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      const isRankingSpaceExist = await prisma.rankingSpaces.findFirst({
        where: {
          orderNo: data.orderNo,
        },
      });

      if (isRankingSpaceExist) {
        await prisma.rankingSpaces.update({
          where: {
            spaceId_rankingId: {
              rankingId: isRankingSpaceExist.rankingId,
              spaceId: isRankingSpaceExist.spaceId,
            },
          },
          data: {
            orderNo: isRankingSpaceExist.orderNo + 1,
          },
        });
      }

      await prisma.rankingSpaces.create({
        data: {
          orderNo: data.orderNo,
          ranking: {
            connect: {
              id: rankingId,
            },
          },
          space: {
            connect: {
              id: data.spaceId,
            },
          },
        },
      });
    });
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

  async deleteRankingSpace(rankingId: string, spaceId: string) {
    await this.database.$transaction(async (prisma) => {
      const rankingSpace = await prisma.rankingSpaces.findUnique({
        where: {
          spaceId_rankingId: {
            rankingId,
            spaceId,
          },
        },
      });
      if (!rankingSpace) throw new RankingException(RANKING_ERROR_CODE.NOT_FOUND(RANKING_SPACE_NOT_FOUND));

      const rankingSpaces = await prisma.rankingSpaces.findMany({
        where: {
          orderNo: {
            gt: rankingSpace.orderNo,
          },
        },
      });

      await prisma.rankingSpaces.delete({
        where: {
          spaceId_rankingId: {
            rankingId,
            spaceId,
          },
        },
      });

      await Promise.all(
        rankingSpaces.map(async (rankingSpace) => {
          await prisma.rankingSpaces.update({
            where: {
              spaceId_rankingId: {
                rankingId: rankingSpace.rankingId,
                spaceId: rankingSpace.spaceId,
              },
            },
            data: {
              orderNo: rankingSpace.orderNo - 1,
            },
          });
        })
      );
    });
  }
}
