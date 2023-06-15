import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreatePaymentDTO, ReservationDetailDTO, ReservationDTO, UpdateReservationDTO } from './dto';
import { ReservationService } from './reservation.service';

@ApiController('reservations', '예약하기')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('me/paging')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내 예약 조회',
      summary: '내 예약 조회 - 유저만 사용가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReservationDTO,
    isPaging: true,
  })
  async getMyReservations(@Paging() paging: PagingDTO, @ReqUser() user: RequestUser) {
    return await this.reservationService.findMyPagingReservations(paging, user.id);
  }

  @Get(':reservationId/me')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내 예약 상세 조회',
      summary: '내 예약 상세 조회 - 유저만 사용가능합니다.',
    },
    params: {
      name: 'reservationId',
      type: 'string',
      description: '예약 아이디',
    },
  })
  @ResponseApi({
    type: ReservationDetailDTO,
  })
  async getMyReservation(@Param('reservationId') id: string, @ReqUser() user: RequestUser) {
    return await this.reservationService.findMyReservation(id, user.id);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '예약하기',
      summary: '예약하기 - 유저만 사용가능합니다.',
    },
    body: {
      type: CreatePaymentDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReservation(@ReqUser() user: RequestUser, @Body() data: CreatePaymentDTO) {
    return await this.reservationService.createReservation(user.id, data);
  }

  @Patch(':reservationId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '예약 수정하기',
      summary: '예약 수정하기 - 유저만 사용가능합니다.',
    },
    params: {
      name: 'reservationId',
      type: 'string',
      description: '예약 아이디',
    },
    body: {
      type: UpdateReservationDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReservation(
    @Param('reservationId') id: string,
    @ReqUser() user: RequestUser,
    @Body() data: UpdateReservationDTO
  ) {
    return await this.reservationService.updateReservation(id, user.id, data);
  }

  @Delete(':reservationId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '예약 삭제하기',
      summary: '예약 삭제하기 - 유저만 사용가능합니다.',
    },
    params: {
      name: 'reservationId',
      type: 'string',
      description: '예약 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReservation(@Param('reservationId') id: string, @ReqUser() user: RequestUser) {
    return await this.reservationService.deleteMyReservation(id, user.id);
  }
}
