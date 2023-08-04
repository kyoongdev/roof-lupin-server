import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CreateTaxReturnDTO, TaxReturnDTO, UpdateTaxReturnDTO } from './dto';
import { TaxReturnRepository } from './tax-return.repository';
export declare class TaxReturnService {
    private readonly taxReturnRepository;
    constructor(taxReturnRepository: TaxReturnRepository);
    findTaxReturn(id: string): Promise<TaxReturnDTO>;
    findPagingTaxReturns(paging: PagingDTO, args?: Prisma.TaxReturnFindManyArgs): Promise<PaginationDTO<TaxReturnDTO>>;
    createTaxReturn(data: CreateTaxReturnDTO): Promise<string>;
    updateTaxReturn(id: string, data: UpdateTaxReturnDTO): Promise<void>;
    deleteTaxReturn(id: string): Promise<void>;
}
