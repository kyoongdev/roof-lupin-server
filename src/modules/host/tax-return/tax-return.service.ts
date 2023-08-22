import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { TaxReturnDTO } from '@/modules/admin/dto/tax-return';
import { TaxReturnRepository } from '@/modules/admin/tax-return/tax-return.repository';

import { HOST_ERROR_CODE, HOST_TAX_RETURN_FIND_FORBIDDEN } from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostTaxReturnService {
  constructor(private readonly taxReturnRepository: TaxReturnRepository) {}

  async findTaxReturn(id: string, hostId: string) {
    const taxReturn = await this.taxReturnRepository.findTaxReturn(id);

    if (taxReturn.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(HOST_TAX_RETURN_FIND_FORBIDDEN));
    }

    return taxReturn;
  }

  async findPagingTaxReturns(paging: PagingDTO, hostId: string) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.taxReturnRepository.countTaxReturns({
      where: {
        host: {
          id: hostId,
        },
        deletedAt: null,
      },
    });
    const taxReturns = await this.taxReturnRepository.findTaxReturns({
      where: {
        host: {
          id: hostId,
        },
        deletedAt: null,
      },
      skip,
      take,
    });

    return new PaginationDTO<TaxReturnDTO>(taxReturns, { count, paging });
  }
}
