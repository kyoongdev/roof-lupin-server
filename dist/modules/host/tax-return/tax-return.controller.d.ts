import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { TaxReturnDTO } from '@/modules/tax-return/dto';
import { HostTaxReturnService } from './tax-return.service';
export declare class HostTaxReturnController {
    private readonly taxReturnService;
    constructor(taxReturnService: HostTaxReturnService);
    findTaxReturn(host: RequestHost, id: string): Promise<TaxReturnDTO>;
    findTaxReturns(host: RequestHost, paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<TaxReturnDTO>>;
}
