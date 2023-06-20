import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CouponDTO, CreateCouponDTO, UpdateCouponDTO, UpdateUserCouponDTO, UserCouponDTO } from '@/modules/coupon/dto';
import { CreateUserCouponDTO } from '@/modules/coupon/dto/create-user-coupon.dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminCouponService } from './coupon.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/coupons', '[관리자] 쿠폰 관리')
export class AdminCouponController {
  constructor(private readonly couponService: AdminCouponService) {}

  @Get(':couponId/detail')
  @RequestApi({
    summary: {
      description: '쿠폰 상세 조회',
      summary: '쿠폰 상세 조회 - 관리자만 사용 가능',
    },
  })
  @ResponseApi({
    type: CouponDTO,
  })
  async getCoupon(@Param('couponId') id: string) {
    return await this.couponService.findCoupon(id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '쿠폰 목록 조회',
      summary: '쿠폰 목록 조회 - 관리자만 사용 가능',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: CouponDTO,
    isPaging: true,
  })
  async getCoupons(@Paging() paging: PagingDTO) {
    return await this.couponService.findPagingCoupons(paging);
  }

  @Get('users/:userCouponId/detail')
  @RequestApi({
    summary: {
      description: '사용자 쿠폰 조회',
      summary: '사용자 쿠폰 조회 - 관리자만 사용 가능',
    },
  })
  @ResponseApi({
    type: UserCouponDTO,
  })
  async getUserCoupon(@Param('userCouponId') id: string) {
    return await this.couponService.findUserCoupon(id);
  }

  @Get('users')
  @RequestApi({
    summary: {
      description: '사용자 쿠폰 목록 조회',
      summary: '사용자 쿠폰 목록 조회 - 관리자만 사용 가능',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: UserCouponDTO,
    isPaging: true,
  })
  async getUserCoupons(@Paging() paging: PagingDTO) {
    return await this.couponService.findPagingUserCoupons(paging);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '쿠폰 생성',
      summary: '쿠폰 생성 - 관리자만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createCoupon(@Body() body: CreateCouponDTO) {
    return await this.couponService.createCoupon(body);
  }

  @Post(':couponId/users')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '유저 쿠폰 생성',
      summary: '유저 쿠폰 생성 - 관리자만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createUserCoupon(@Param('couponId') id: string, @Body() body: CreateUserCouponDTO) {
    return await this.couponService.createUserCoupon(id, body);
  }

  @Patch(':couponId')
  @RequestApi({
    summary: {
      description: '쿠폰 수정',
      summary: '쿠폰 수정 - 관리자만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateCoupon(@Param('couponId') id: string, @Body() body: UpdateCouponDTO) {
    return await this.couponService.updateCoupon(id, body);
  }

  @Patch('users/:userCouponId')
  @RequestApi({
    summary: {
      description: '유저 쿠폰 수정',
      summary: '유저 쿠폰 수정 - 관리자만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateUserCoupon(@Param('userCouponId') id: string, @Body() body: UpdateUserCouponDTO) {
    return await this.couponService.updateUserCoupon(id, body);
  }

  @Delete(':couponId')
  @RequestApi({
    summary: {
      description: '쿠폰 수정',
      summary: '쿠폰 수정 - 관리자만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteCoupon(@Param('couponId') id: string) {
    return await this.couponService.deleteCoupon(id);
  }

  @Delete('users/:userCouponId')
  @RequestApi({
    summary: {
      description: '유저 쿠폰 수정',
      summary: '유저 쿠폰 수정 - 관리자만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteUserCoupon(@Param('userCouponId') id: string) {
    return await this.couponService.deleteUserCoupon(id);
  }
}
