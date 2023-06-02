import { Injectable } from '@nestjs/common';

import { UpdateHostDTO } from './dto';
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
    await this.hostRepository.updateHost(id, data);
  }
}
