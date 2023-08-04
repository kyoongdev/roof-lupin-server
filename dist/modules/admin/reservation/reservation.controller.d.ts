import { PagingDTO } from 'cumuco-nestjs';
import { ReservationDetailDTO, ReservationDTO } from '@/modules/reservation/dto';
import { AdminFindReservationsQuery } from '../dto/query';
import { AdminReservationService } from './reservation.service';
export declare class AdminReservationController {
    private readonly adminReservationService;
    constructor(adminReservationService: AdminReservationService);
    getReservations(paging: PagingDTO, query: AdminFindReservationsQuery): Promise<import("cumuco-nestjs").PaginationDTO<ReservationDTO>>;
    getReservationDetail(id: string): Promise<ReservationDetailDTO>;
}
