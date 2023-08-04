import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { SettlementDetailDTO, SettlementDTO } from '../dto/settlement';
import { FindSettlementsQuery } from '../dto/settlement/query';
import { SettlementService } from './settlement.service';
export declare class SettlementController {
    private readonly settlementService;
    constructor(settlementService: SettlementService);
    findSettlement(id: string): Promise<SettlementDetailDTO>;
    findSettlements(paging: PagingDTO, query: FindSettlementsQuery, host: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<SettlementDTO>>;
}
