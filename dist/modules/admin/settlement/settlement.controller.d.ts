import { PagingDTO } from 'cumuco-nestjs';
import { CreateSettlementDTO, SettlementDTO, UpdateSettlementDTO } from '@/modules/host/dto/settlement';
import { AdminFindSettlementsQuery } from '../dto/query';
import { AdminSettlementService } from './settlement.service';
export declare class AdminSettlementController {
    private readonly settlementService;
    constructor(settlementService: AdminSettlementService);
    getSettlementDetail(id: string): Promise<import("@/modules/host/dto/settlement").SettlementDetailDTO>;
    getSettlements(paging: PagingDTO, query: AdminFindSettlementsQuery): Promise<import("cumuco-nestjs").PaginationDTO<SettlementDTO>>;
    createSettlement(data: CreateSettlementDTO): Promise<string>;
    updateSettlement(id: string, data: UpdateSettlementDTO): Promise<void>;
    deleteSettlement(id: string): Promise<void>;
}
