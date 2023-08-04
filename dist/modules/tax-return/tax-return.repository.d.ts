import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateTaxReturnDTO, TaxReturnDTO, UpdateTaxReturnDTO } from './dto';
export declare class TaxReturnRepository {
    private readonly database;
    constructor(database: PrismaService);
    findTaxReturn(id: string): Promise<TaxReturnDTO>;
    countTaxReturns(args?: Prisma.TaxReturnCountArgs): Promise<number>;
    findTaxReturns(args?: Prisma.TaxReturnFindManyArgs): Promise<TaxReturnDTO[]>;
    createTaxReturn(data: CreateTaxReturnDTO): Promise<string>;
    updateTaxReturn(id: string, data: UpdateTaxReturnDTO): Promise<void>;
    deleteTaxReturn(id: string): Promise<void>;
}
