import { Injectable } from '@nestjs/common';

import { HostRepository } from '@/modules/host/host.repository';

@Injectable()
export class AdminHostService {
  constructor(private readonly hostRepository: HostRepository) {}

  async findHosts() {
    return await this.hostRepository.findHosts();
  }
}
