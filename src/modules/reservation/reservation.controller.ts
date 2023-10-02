import { Body, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { PaymentService } from '../payment/payment.service';

import { CreateReservationDTO, ReservationDetailDTO, ReservationDTO } from './dto';
import { FindReservationQuery } from './dto/query';
import { CancelReservationQuery } from './dto/query/cancel-reservation.query';
import { ReservationService } from './reservation.service';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('reservations', '예약하기')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly paymentService: PaymentService
  ) {}

  @Get('close')
  @RequestApi({
    summary: {
      description: '내 근접한 예약 조회',
      summary: '내 근접한 예약 조회 response nullable',
    },
  })
  @ResponseApi({
    type: ReservationDTO,
  })
  async getMyCloseReservations(@ReqUser() user: RequestUser) {
    return await this.reservationService.findMyCloseReservation(user.id);
  }

  @Get('paging')
  @RequestApi({
    summary: {
      description: '내 예약 조회',
      summary: '내 예약 조회 - 유저만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: ReservationDTO,
    isPaging: true,
  })
  async getMyReservations(
    @Paging() paging: PagingDTO,
    @ReqUser() user: RequestUser,
    @Query() query: FindReservationQuery
  ) {
    return await this.reservationService.findMyPagingReservations(paging, user.id, query.generateQuery());
  }

  @Get(':reservationId/detail')
  @RequestApi({
    summary: {
      description: '내 예약 상세 조회',
      summary: '내 예약 상세 조회 - 유저만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: ReservationDetailDTO,
  })
  async getMyReservation(@Param('reservationId') id: string, @ReqUser() user: RequestUser) {
    return await this.reservationService.findMyReservation(id, user.id);
  }

  @Post('prepare')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '예약 신청하기',
      summary: '예약 신청하기',
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async createPayment(@ReqUser() user: RequestUser, @Body() body: CreateReservationDTO) {
    return await this.paymentService.requestPayment(user.id, body);
  }

  @Delete(':reservationId')
  @RequestApi({
    summary: {
      description: '예약 취소하기',
      summary: '예약 취소하기',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReservation(
    @Param('reservationId') id: string,
    @Query() query: CancelReservationQuery,
    @ReqUser() user: RequestUser
  ) {
    return await this.reservationService.deleteMyReservation(id, user.id, query.reason);
  }
}
