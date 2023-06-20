import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CouponService } from './coupon.service';
import { UserCouponDTO } from './dto';

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
}
