import type { Prisma } from '@prisma/client';
import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { CreatePaymentDTO, ReservationDetailDTO, ReservationDTO, UpdatePaymentDTO, UpdateReservationDTO } from './dto';
export declare class ReservationRepository {
    private readonly database;
    constructor(database: PrismaService);
    findFirstReservation(args?: Prisma.ReservationFindFirstArgs): Promise<ReservationDTO>;
    findReservation(id: string): Promise<ReservationDetailDTO>;
    findReservationByOrderId(orderId: string): Promise<ReservationDetailDTO>;
    findReservationByOrderResultId(orderResultId: string): Promise<ReservationDetailDTO>;
    countReservations(args?: Prisma.ReservationCountArgs): Promise<number>;
    findReservations(args?: Prisma.ReservationFindManyArgs): Promise<ReservationDTO[]>;
    createPayment(userId: string, data: CreatePaymentDTO, isApproved?: boolean): Promise<string>;
    createReservationWithTransaction(database: TransactionPrisma, userId: string, data: CreatePaymentDTO): Promise<import(".prisma/client").Reservation>;
    updateReservation(id: string, data: UpdateReservationDTO): Promise<void>;
    updatePayment(id: string, data: UpdatePaymentDTO): Promise<void>;
    updatePaymentWithTransaction(database: TransactionPrisma, id: string, data: UpdatePaymentDTO): Promise<void>;
    deleteReservation(id: string): Promise<void>;
}
