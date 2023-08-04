import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ReservationDTO } from './dto';
import { ReservationRepository } from './reservation.repository';
export declare class ReservationService {
    private readonly reservationRepository;
    constructor(reservationRepository: ReservationRepository);
    findMyPagingReservations(paging: PagingDTO, userId: string, args?: Prisma.ReservationFindManyArgs): Promise<PaginationDTO<ReservationDTO>>;
    findMyReservation(id: string, userId: string): Promise<import("./dto").ReservationDetailDTO>;
    findMyCloseReservation(userId: string): Promise<ReservationDTO>;
    deleteMyReservation(id: string, userId: string): Promise<void>;
}
