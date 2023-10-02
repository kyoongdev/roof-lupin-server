import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { BlockHostDTO, CreateHostDTO, HostDTO, UpdateHostDTO } from '@/modules/host/dto';
import { HOST_ERROR_CODE } from '@/modules/host/exception/errorCode';
import { HostException } from '@/modules/host/exception/host.exception';
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

  async createHost(data: CreateHostDTO) {
    const isExist = await this.hostRepository.checkHostByEmail(data.email);

    if (isExist) {
      throw new HostException(HOST_ERROR_CODE.HOST_ALREADY_EXIST);
    }

    return await this.hostRepository.createHost(data);
  }

  async updateHost(id: string, data: UpdateHostDTO) {
    await this.findHost(id);
    await this.hostRepository.updateHost(id, data);
  }

  async blockHost(id: string, data: BlockHostDTO) {
    await this.findHost(id);
    await this.hostRepository.blockHost(id, data);
  }

  async unBlockHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.unBlockHost(id);
  }

  async deleteHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.deleteHost(id);
  }

  async hardDeleteHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.hardDeleteHost(id);
  }
}
