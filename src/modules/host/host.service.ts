import { Injectable } from '@nestjs/common';

import { CreateHostAccountDTO, UpdateHostAccountDTO, UpdateHostDTO } from './dto';
import { HostRepository } from './host.repository';

@Injectable()
export class HostService {
  constructor(private readonly hostRepository: HostRepository) {}

  async findHost(id: string) {
    return await this.hostRepository.findHost(id);
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
    return await this.hostRepository.createHostAccount(hostId, data);
  }

  async updateHostAccount(id: string, data: UpdateHostAccountDTO) {
    await this.findHostAccount(id);
    await this.hostRepository.updateHostAccount(id, data);
  }

  async deleteHostAccount(id: string) {
    await this.findHostAccount(id);
    await this.hostRepository.deleteHostAccount(id);
  }
}
