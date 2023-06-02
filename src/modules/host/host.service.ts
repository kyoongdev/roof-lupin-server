import { Injectable } from '@nestjs/common';

import { CreateHostAccountDTO, UpdateHostAccountDTO, UpdateHostDTO } from './dto';
import { HostRepository } from './host.repository';

@Injectable()
export class HostService {
  constructor(private readonly hostRepository: HostRepository) {}

  async findHost(id: string) {
    return await this.hostRepository.findHost(id);
  }

  async findHostDetail(id: string) {
    return await this.hostRepository.findHostDetail(id);
  }

  async findHostAccount(id: string) {
    return await this.hostRepository.findHostAccount(id);
  }

  async findHostAccountByHostId(hostId: string) {
    return await this.hostRepository.findHostAccountByHostId(hostId);
  }

  async updateHost(id: string, data: UpdateHostDTO) {
    await this.findHost(id);
    await this.hostRepository.updateHost(id, data);
  }

  async deleteHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.deleteHost(id);
  }

  async hardDeleteHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.hardDeleteHost(id);
  }

  async createHostAccount(hostId: string, data: CreateHostAccountDTO) {
    await this.findHostAccountByHostId(hostId);

    return await this.hostRepository.createHostAccount(hostId, data);
  }

  async updateHostAccountByHostId(hostId: string, data: UpdateHostAccountDTO) {
    const account = await this.findHostAccountByHostId(hostId);
    await this.hostRepository.updateHostAccount(account.id, data);
  }

  async deleteHostAccountByHostId(hostId: string) {
    const account = await this.findHostAccountByHostId(hostId);
    await this.hostRepository.deleteHostAccount(account.id);
  }
}
