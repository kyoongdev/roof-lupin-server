import { Injectable } from '@nestjs/common';

import { ServiceRepository } from '@/modules/service/service.repository';

@Injectable()
export class HostServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findServiceTitles() {
    return this.serviceRepository.findServiceTitles();
  }

  async findServices() {
    return this.serviceRepository.findServices();
  }
}
