import { PagingDTO } from 'cumuco-nestjs';
import { CreateTaxReturnDTO, TaxReturnDTO, UpdateTaxReturnDTO } from './dto';
import { TaxReturnService } from './tax-return.service';
export declare class TaxReturnController {
    private readonly taxReturnService;
    constructor(taxReturnService: TaxReturnService);
    getTaxReturn(id: string): Promise<TaxReturnDTO>;
    getTaxReturns(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<TaxReturnDTO>>;
    createTaxReturn(body: CreateTaxReturnDTO): Promise<string>;
    updateTaxReturn(id: string, body: UpdateTaxReturnDTO): Promise<void>;
    deleteTaxReturn(id: string): Promise<void>;
}
