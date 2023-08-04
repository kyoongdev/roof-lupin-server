import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { PaymentService } from '../payment/payment.service';
import { CreateReservationDTO, ReservationDetailDTO, ReservationDTO } from './dto';
import { FindReservationQuery } from './dto/query';
import { ReservationService } from './reservation.service';
export declare class ReservationController {
    private readonly reservationService;
    private readonly paymentService;
    constructor(reservationService: ReservationService, paymentService: PaymentService);
    getMyCloseReservations(user: RequestUser): Promise<ReservationDTO>;
    getMyReservations(paging: PagingDTO, user: RequestUser, query: FindReservationQuery): Promise<import("cumuco-nestjs").PaginationDTO<ReservationDTO>>;
    getMyReservation(id: string, user: RequestUser): Promise<ReservationDetailDTO>;
    createPayment(user: RequestUser, body: CreateReservationDTO): Promise<string>;
    deleteReservation(id: string, user: RequestUser): Promise<void>;
}
