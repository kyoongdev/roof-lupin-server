import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
export interface AdminFindSettlementsQueryProps {
    hostName?: string;
    spaceTitle?: string;
}
export declare class AdminFindSettlementsQuery extends PagingDTO {
    hostName?: string;
    spaceTitle?: string;
    static generateQuery(query: AdminFindSettlementsQueryProps): Prisma.SettlementFindManyArgs;
}
