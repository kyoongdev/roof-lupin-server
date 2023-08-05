import { Injectable } from '@nestjs/common';

import { CreateServiceTitleDTO } from '@/modules/service/dto/create-service-title.dto';
import { UpdateServiceTitleDTO } from '@/modules/service/dto/update-service-title.dto';
import { ServiceRepository } from '@/modules/service/service.repository';

@Injectable()
export class HostServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findServiceTitles() {
    return this.serviceRepository.findServiceTitles();
  }
}
