import { Body, Get, Param, Post, Res, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CouponService } from './coupon.service';
import { RegisterCouponByCodeDTO, UserCouponCountDTO, UserCouponDTO } from './dto';

@ApiController('coupons', '쿠폰')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get('users/:userCouponId/detail')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '사용자 쿠폰 조회',
      summary: '사용자 쿠폰 조회 - 유저만 사용 가능',
    },
  })
  @ResponseApi({
    type: UserCouponDTO,
  })
  async getMyCoupon(@ReqUser() user: RequestUser, @Param('userCouponId') id: string) {
    return await this.couponService.findUserCoupon(id);
  }

  @Get('users')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '사용자 쿠폰 목록 조회',
      summary: '사용자 쿠폰 목록 조회 - 유저만 사용 가능',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: UserCouponDTO,
    isPaging: true,
  })
  async getMyCoupons(@ReqUser() user: RequestUser, @Paging() paging: PagingDTO) {
    return await this.couponService.findPagingUserCoupons(paging, user.id);
  }

  @Get('count/spaces/:spaceId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '사용자 공간별 쿠폰 개수 조회',
      summary: '사용자  공간편 쿠폰 개수 조회 - 유저만 사용 가능',
    },
  })
  @ResponseApi({
    type: UserCouponCountDTO,
  })
  async getMySpaceCouponsCount(@ReqUser() user: RequestUser, @Param('spaceId') spaceId: string) {
    return await this.couponService.countUserCoupons(user.id, spaceId);
  }

  @Post('/register')
  @UseInterceptors(ResponseWithIdInterceptor)
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '쿠폰 등록',
      summary: '쿠폰 등록 - 유저만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async registerCouponByCode(@ReqUser() user: RequestUser, @Body() body: RegisterCouponByCodeDTO) {
    return await this.couponService.registerCouponByCode(user, body);
  }
}
