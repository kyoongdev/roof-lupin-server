import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { SettlementDTO } from '../dto/settlement';
import { SettlementRepository } from './settlement.repository';
export declare class SettlementService {
    private readonly settlementRepository;
    constructor(settlementRepository: SettlementRepository);
    findSettlement(id: string): Promise<import("../dto/settlement").SettlementDetailDTO>;
    findMySettlements(hostId: string, paging: PagingDTO, args?: Prisma.SettlementFindManyArgs): Promise<PaginationDTO<SettlementDTO>>;
}
