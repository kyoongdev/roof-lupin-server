import { Injectable } from '@nestjs/common';

import { CreateServiceDTO, UpdateServiceDTO } from '@/modules/service/dto';
import { CreateServiceTitleDTO } from '@/modules/service/dto/create-service-title.dto';
import { UpdateServiceTitleDTO } from '@/modules/service/dto/update-service-title.dto';
import { ServiceRepository } from '@/modules/service/service.repository';

import { IconRepository } from '../icon/icon.repository';

@Injectable()
export class AdminServiceService {
  constructor(private readonly serviceRepository: ServiceRepository, private readonly iconRepository: IconRepository) {}
  async findService(id: string) {
    return await this.serviceRepository.findService(id);
  }

  async findServices() {
    return await this.serviceRepository.findServices();
  }

  async findServiceTitle(id: string) {
    return await this.serviceRepository.findServiceTitle(id);
  }

  async createService(data: CreateServiceDTO) {
    return await this.serviceRepository.createService(data);
  }

  async updateService(id: string, data: UpdateServiceDTO) {
    const service = await this.findService(id);

    if (data.notSelectedIcon) {
      const notSelectedIcon = service.icons.find((icon) => !icon.isSelected);
      if (notSelectedIcon) {
        const icon = await this.iconRepository.findIcon(notSelectedIcon.iconId);
        await this.iconRepository.deleteIcon(icon.id);
      }
    }

    if (data.selectedIcon) {
      const selectedIcon = service.icons.find((icon) => icon.isSelected);
      if (selectedIcon) {
        const icon = await this.iconRepository.findIcon(selectedIcon.iconId);
        await this.iconRepository.deleteIcon(icon.id);
      }
    }

    return await this.serviceRepository.updateService(id, data);
  }

  async deleteService(id: string) {
    const service = await this.findService(id);

    const selectedIcon = service.icons.find((icon) => icon.isSelected);
    const notSelectedIcon = service.icons.find((icon) => !icon.isSelected);
    if (selectedIcon) {
      const icon = await this.iconRepository.findIcon(selectedIcon.iconId);
      await this.iconRepository.deleteIcon(icon.id);
    }

    if (notSelectedIcon) {
      const icon = await this.iconRepository.findIcon(notSelectedIcon.iconId);
      await this.iconRepository.deleteIcon(icon.id);
    }

    await this.serviceRepository.deleteService(id);
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
