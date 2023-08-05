import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { ServiceDTO } from './dto';
import { CreateServiceTitleDTO } from './dto/create-service-title.dto';
import { ServiceTitleDTO } from './dto/service-title.dto';
import { UpdateServiceTitleDTO } from './dto/update-service-title.dto';
import { SERVICE_ERROR_CODE, SERVICE_NOT_FOUND } from './exception/errorCode';
import { ServiceException } from './exception/service.exception';

@Injectable()
export class ServiceRepository {
  constructor(private readonly database: PrismaService) {}

  async findService(id: string) {
    const service = await this.database.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new ServiceException(SERVICE_ERROR_CODE.NOT_FOUND(SERVICE_NOT_FOUND));
    }

    return new ServiceDTO(service);
  }

  async findServices(args = {} as Prisma.ServiceFindManyArgs) {
    const services = await this.database.service.findMany(args);
    return services.map((service) => new ServiceDTO(service));
  }

  async findServiceTitle(id: string) {
    const serviceTitle = await this.database.serviceTitle.findUnique({
      where: {
        id,
      },
      include: {
        services: true,
      },
    });

    if (!serviceTitle) {
      throw new ServiceException(SERVICE_ERROR_CODE.NOT_FOUND(SERVICE_NOT_FOUND));
    }

    return new ServiceTitleDTO(serviceTitle);
  }

  async findServiceTitles(args = {} as Prisma.ServiceTitleFindManyArgs) {
    const serviceTitles = await this.database.serviceTitle.findMany({
      ...args,
      include: {
        services: true,
      },
    });
    return serviceTitles.map((serviceTitle) => new ServiceTitleDTO(serviceTitle));
  }

  async createServiceTitle(data: CreateServiceTitleDTO) {
    const serviceTitle = await this.database.serviceTitle.create({
      data: {
        name: data.name,
        services: {
          create: data.services.map((service) => ({
            name: service.name,
            iconPath: service.iconPath,
          })),
        },
      },
    });

    return serviceTitle.id;
  }

  async updateServiceTitle(id: string, data: UpdateServiceTitleDTO) {
    const serviceTitle = await this.database.serviceTitle.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        ...(data.services && {
          services: {
            deleteMany: {},
            create: data.services.map((service) => ({
              name: service.name,
              iconPath: service.iconPath,
            })),
          },
        }),
      },
    });
  }

  async deleteServiceTitle(id: string) {
    await this.database.serviceTitle.delete({
      where: {
        id,
      },
    });
  }
}
