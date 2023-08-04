import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export declare class FindReservationQuery extends PagingDTO {
    isApproved?: boolean;
    generateQuery(): Prisma.ReservationFindManyArgs;
}
