import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateTaxReturnDTO, TaxReturnDTO, UpdateTaxReturnDTO } from './dto';
import { TAX_RETURN_ERROR_CODE, TAX_RETURN_NOT_FOUND } from './exception/errorCode';
import { TaxReturnException } from './exception/tax-return.exception';

@Injectable()
export class TaxReturnRepository {
  constructor(private readonly database: PrismaService) {}

  async findTaxReturn(id: string) {
    const taxReturn = await this.database.taxReturn.findUnique({
      where: { id },
      include: {
        host: true,
      },
    });

    if (!taxReturn) {
      throw new TaxReturnException(TAX_RETURN_ERROR_CODE.NOT_FOUND(TAX_RETURN_NOT_FOUND));
    }

    return new TaxReturnDTO(taxReturn);
  }

  async countTaxReturns(args = {} as Prisma.TaxReturnCountArgs) {
    return await this.database.taxReturn.count(args);
  }

  async findTaxReturns(args = {} as Prisma.TaxReturnFindManyArgs) {
    const taxReturns = await this.database.taxReturn.findMany({
      where: args.where,
      include: {
        host: true,
      },
      orderBy: {
        submittedAt: 'desc',
        ...args.orderBy,
      },
      ...args,
    });

    return taxReturns.map(
      (taxReturn) =>
        new TaxReturnDTO({
          ...taxReturn,
          host: taxReturn.host,
        })
    );
  }

  async createTaxReturn(data: CreateTaxReturnDTO) {
    const taxReturn = await this.database.taxReturn.create({
      data,
    });

    return taxReturn.id;
  }

  async updateTaxReturn(id: string, data: UpdateTaxReturnDTO) {
    await this.database.taxReturn.update({
      where: { id },
      data,
    });
  }

  async deleteTaxReturn(id: string) {
    await this.database.taxReturn.delete({
      where: { id },
    });
  }
}
