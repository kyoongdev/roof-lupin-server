import { Injectable } from '@nestjs/common';

import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findServiceTitles() {
    return this.serviceRepository.findServiceTitles();
  }
}
