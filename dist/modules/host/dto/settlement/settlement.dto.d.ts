import { Prisma } from '@prisma/client';
import { FindSettlementsQuery } from './query';
export interface SettlementDTOProps {
    id: string;
    year: string;
    month: string;
    day: string;
    settlementCost: number;
    totalCost: number;
    vatCost: number;
    discountCost: number;
    originalCost: number;
    isPayed: boolean;
}
export declare class SettlementDTO {
    id: string;
    year: string;
    month: string;
    day: string;
    settlementCost: number;
    totalCost: number;
    vatCost: number;
    discountCost: number;
    originalCost: number;
    isPayed: boolean;
    constructor(props: SettlementDTOProps);
    static generateQuery(query: FindSettlementsQuery): Prisma.SettlementFindManyArgs;
}
