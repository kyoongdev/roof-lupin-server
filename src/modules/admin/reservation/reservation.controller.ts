import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ReservationDetailDTO, ReservationDTO } from '@/modules/reservation/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminReservationService } from './reservation.service';

// @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/reservations', '[관리자] 예약 관리')
export class AdminReservationController {
  constructor(private readonly adminReservationService: AdminReservationService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '예약 목록 조회',
      summary: '예약 목록 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReservationDTO,
    isPaging: true,
  })
  async getReservations(@Paging() paging: PagingDTO) {
    return await this.adminReservationService.findPagingReservations(paging);
  }

  @Get(':reservationId/detail')
  @RequestApi({
    summary: {
      description: '예약 상세 조회',
      summary: '예약 상세 조회',
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
  async getReservationDetail(@Param('reservationId') id: string) {
    return await this.adminReservationService.findReservation(id);
  }
}
