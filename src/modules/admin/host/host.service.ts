import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { HostDTO } from '@/modules/host/dto';
import { HostRepository } from '@/modules/host/host.repository';

@Injectable()
export class AdminHostService {
  constructor(private readonly hostRepository: HostRepository) {}

  async findPagingHosts(paging: PagingDTO, args = {} as Prisma.HostFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.hostRepository.countHosts({
      where: args.where,
    });
    const hosts = await this.hostRepository.findHosts({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<HostDTO>(hosts, { count, paging });
  }

  async findHost(id: string) {
    return await this.hostRepository.findHostDetail(id);
  }
}
