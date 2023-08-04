import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ReservationDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
export declare class AdminReservationService {
    private readonly reservationRepository;
    constructor(reservationRepository: ReservationRepository);
    findReservation(id: string): Promise<import("@/modules/reservation/dto").ReservationDetailDTO>;
    findPagingReservations(paging: PagingDTO, args?: Prisma.ReservationFindManyArgs): Promise<PaginationDTO<ReservationDTO>>;
}
