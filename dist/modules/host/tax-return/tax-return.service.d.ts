import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { TaxReturnDTO } from '@/modules/tax-return/dto';
import { TaxReturnRepository } from '@/modules/tax-return/tax-return.repository';
export declare class HostTaxReturnService {
    private readonly taxReturnRepository;
    constructor(taxReturnRepository: TaxReturnRepository);
    findTaxReturn(id: string, hostId: string): Promise<TaxReturnDTO>;
    findPagingTaxReturns(paging: PagingDTO, hostId: string): Promise<PaginationDTO<TaxReturnDTO>>;
}
