import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class AdminFindReservationsQuery extends PagingDTO {
    userId?: string;
    generateQuery(): Prisma.ReservationFindManyArgs;
}
