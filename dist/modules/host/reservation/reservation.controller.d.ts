import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { ReservationDetailDTO, ReservationDTO } from '@/modules/reservation/dto';
import { HostReservationService } from './reservation.service';
export declare class HostReservationController {
    private readonly reservationService;
    constructor(reservationService: HostReservationService);
    getReservationDetail(user: RequestHost, id: string): Promise<ReservationDetailDTO>;
    getReservationList(user: RequestHost, paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<ReservationDTO>>;
    approveReservation(user: RequestHost, id: string): Promise<void>;
    cancelReservation(user: RequestHost, id: string): Promise<void>;
}
