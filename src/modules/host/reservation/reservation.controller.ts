import { Get, Param, Post } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { ReservationDetailDTO, ReservationDTO } from '@/modules/reservation/dto';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostReservationService } from './reservation.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('/reservations', '[호스트] 예약 관리')
export class HostReservationController {
  constructor(private readonly reservationService: HostReservationService) {}

  @Get(':reservationId/detail')
  @RequestApi({
    summary: {
      summary: '예약 상세 조회하기',
      description: '예약 상세 조회하기',
    },
  })
  @ResponseApi({
    type: ReservationDetailDTO,
  })
  async getReservationDetail(@ReqUser() user: RequestHost, @Param('reservationId') id: string) {
    return await this.reservationService.findReservation(id, user.id);
  }

  @Get()
  @RequestApi({
    summary: {
      summary: '예약 목록 조회하기',
      description: '예약 목록 조회하기',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReservationDTO,
    isPaging: true,
  })
  async getReservationList(@ReqUser() user: RequestHost, @Paging() paging: PagingDTO) {
    return await this.reservationService.findPagingReservations(paging, user.id);
  }

  @Post(':reservationId/approve')
  @RequestApi({
    summary: {
      summary: '예약 승인하기',
      description: '예약 승인하기',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async approveReservation(@ReqUser() user: RequestHost, @Param('reservationId') id: string) {
    return await this.reservationService.approveReservation(id, user.id);
  }
}