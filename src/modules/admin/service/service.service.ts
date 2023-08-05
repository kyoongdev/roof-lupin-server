import { Injectable } from '@nestjs/common';

import { CreateServiceTitleDTO } from '@/modules/service/dto/create-service-title.dto';
import { UpdateServiceTitleDTO } from '@/modules/service/dto/update-service-title.dto';
import { ServiceRepository } from '@/modules/service/service.repository';

@Injectable()
export class AdminServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findServiceTitle(id: string) {
    return await this.serviceRepository.findServiceTitle(id);
  }

  async findServiceTitles() {
    return this.serviceRepository.findServiceTitles();
  }

  async createServiceTitle(data: CreateServiceTitleDTO) {
    return await this.serviceRepository.createServiceTitle(data);
  }

  async updateServiceTitle(id: string, data: UpdateServiceTitleDTO) {
    this.findServiceTitle(id);
    return await this.serviceRepository.updateServiceTitle(id, data);
  }

  async deleteServiceTitle(id: string) {
    this.findServiceTitle(id);
    return await this.serviceRepository.deleteServiceTitle(id);
  }
}
