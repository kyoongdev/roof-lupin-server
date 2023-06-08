import { Get } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { ReservationDTO } from './dto';
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
    return this.reservationService.findMyPagingReservations(paging, user.id);
  }
}
