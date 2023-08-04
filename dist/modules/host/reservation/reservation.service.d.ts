import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ReservationDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
export declare class HostReservationService {
    private readonly reservationRepository;
    constructor(reservationRepository: ReservationRepository);
    findReservation(id: string, hostId: string): Promise<import("@/modules/reservation/dto").ReservationDetailDTO>;
    findPagingReservations(paging: PagingDTO, hostId: string, args?: Prisma.ReservationFindManyArgs): Promise<PaginationDTO<ReservationDTO>>;
    approveReservation(id: string, hostId: string): Promise<void>;
    cancelReservation(id: string, hostId: string): Promise<void>;
}
