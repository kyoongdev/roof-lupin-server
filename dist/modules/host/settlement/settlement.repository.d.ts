import { Prisma } from '@prisma/client';
import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { CreateSettlementDTO, SettlementDetailDTO, SettlementDTO, UpdateSettlementDTO } from '../dto/settlement';
export declare class SettlementRepository {
    private readonly database;
    constructor(database: PrismaService);
    checkSettlementByHostAndDate(year: string, month: string, day: string, hostId: string): Promise<boolean>;
    findSettlement(id: string): Promise<SettlementDetailDTO>;
    findSettlementByDate(year: string, month: string, day: string, hostId: string): Promise<SettlementDetailDTO>;
    checkSettlementByDate(year: string, month: string, day: string, hostId: string): Promise<false | SettlementDetailDTO>;
    countSettlements(args?: Prisma.SettlementCountArgs): Promise<number>;
    findSettlements(args?: Prisma.SettlementFindManyArgs): Promise<SettlementDTO[]>;
    createSettlement(data: CreateSettlementDTO): Promise<string>;
    createSettlementWithTransaction(database: TransactionPrisma, data: CreateSettlementDTO): Promise<string>;
    updateSettlement(id: string, data: UpdateSettlementDTO): Promise<void>;
    updateSettlementWithTransaction(database: TransactionPrisma, id: string, data: UpdateSettlementDTO): Promise<void>;
    deleteSettlement(id: string): Promise<void>;
}
