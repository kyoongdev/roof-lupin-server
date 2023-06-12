import { Delete, Get, Param, Post, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard, JwtNullableAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { SpaceDetailDTO, SpaceDTO } from './dto';
import { FindSpacesQuery } from './dto/query';
import { FindByDateQuery } from './dto/query/find-by-date.query';
import { FindByLocationQuery } from './dto/query/find-by-location.query';
import { SpaceService } from './space.service';

@ApiController('spaces', '공간')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Get(':spaceId/detail')
  @Auth([JwtNullableAuthGuard])
  @RequestApi({
    summary: {
      description: '공간 상세 조회하기',
      summary: '공간 상세 조회하기',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
      required: true,
    },
  })
  @ResponseApi({
    type: SpaceDetailDTO,
  })
  async getSpace(@Param('spaceId') id: string, @ReqUser() user?: RequestUser) {
    console.log(user);
    return await this.spaceService.findSpace(id, user?.id);
  }

  @Get('paging')
  @RequestApi({
    summary: {
      description: '공간 목록 조회하기',
      summary: '공간 목록 조회하기',
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isPaging: true,
  })
  async getPagingSpaces(@Paging() paging: PagingDTO, @Query() query: FindSpacesQuery) {
    const location: FindByLocationQuery | undefined = query.lat &&
      query.lat &&
      query.distance && {
        lat: query.lat,
        lng: query.lng,
        distance: query.distance,
      };

    const date: FindByDateQuery | undefined = query.year &&
      query.month &&
      query.day &&
      query.time && {
        year: query.year,
        month: query.month,
        day: query.day,
        time: query.time,
      };
    return await this.spaceService.findPagingSpaces(
      paging,
      {
        where: {
          ...(query.userCount && {
            minUser: {
              lte: query.userCount,
            },
          }),
          ...(query.category && {
            categories: {
              some: {
                category: {
                  name: query.category,
                },
              },
            },
          }),
          ...(query.locationName && {
            location: {
              OR: [
                {
                  jibunAddress: {
                    contains: query.locationName,
                  },
                },
                {
                  roadAddress: {
                    contains: query.locationName,
                  },
                },
              ],
            },
          }),
        },
      },
      location,
      date
    );
  }

  @Get('interest')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 찜 목록 조회하기',
      summary: '공간 찜 목록 조회하기 - 유저만 사용가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isPaging: true,
  })
  async getPagingInterestSpaces(@Paging() paging: PagingDTO, @ReqUser() user: RequestUser) {
    return await this.spaceService.findPagingSpaces(paging, {
      where: {
        userInterests: {
          some: {
            userId: user.id,
          },
        },
      },
    });
  }

  @Post(':spaceId/interest')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 찜 생성하기',
      summary: '공간 찜 생성하기 - 유저만 사용가능합니다.',
    },
    params: {
      type: 'string',
      name: 'spaceId',
      description: '공간 아이디',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async createSpaceInterest(@Param('spaceId') spaceId: string, @ReqUser() user: RequestUser) {
    await this.spaceService.createInterest(user.id, spaceId);
  }

  @Delete(':spaceId/interest')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 찜 삭제하기',
      summary: '공간 찜 삭제하기 - 유저만 사용가능합니다.',
    },
    params: {
      type: 'string',
      name: 'spaceId',
      description: '공간 아이디',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteSpaceInterest(@Param('spaceId') spaceId: string, @ReqUser() user: RequestUser) {
    await this.spaceService.deleteInterest(user.id, spaceId);
  }
}
