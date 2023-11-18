import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateServiceDTO, ServiceDTO, UpdateServiceDTO } from './dto';
import { CreateServiceTitleDTO } from './dto/create-service-title.dto';
import { ServiceTitleDTO } from './dto/service-title.dto';
import { UpdateServiceTitleDTO } from './dto/update-service-title.dto';
import { SERVICE_ERROR_CODE } from './exception/errorCode';
import { ServiceException } from './exception/service.exception';

@Injectable()
export class ServiceRepository {
  constructor(private readonly database: PrismaService) {}

  async findService(id: string) {
    const service = await this.database.service.findUnique({
      where: {
        id,
      },
      include: {
        icons: {
          include: {
            icon: true,
          },
        },
      },
    });

    if (!service) {
      throw new ServiceException(SERVICE_ERROR_CODE.SERVICE_NOT_FOUND);
    }

    return new ServiceDTO(service);
  }

  async findServices(args = {} as Prisma.ServiceFindManyArgs) {
    const services = await this.database.service.findMany({
      ...args,
      include: {
        icons: {
          include: {
            icon: true,
          },
        },
      },
    });
    return services.map((service) => new ServiceDTO(service));
  }
  async createService(data: CreateServiceDTO) {
    return await this.database.service.create({
      data: {
        name: data.name,
        icons: {
          create: [
            {
              isSelected: true,
              icon: {
                connect: {
                  id: data.selectedIcon.iconId,
                },
              },
            },
            {
              isSelected: false,
              icon: {
                connect: {
                  id: data.notSelectedIcon.iconId,
                },
              },
            },
          ],
        },
        serviceTitle: {
          connect: {
            id: data.titleId,
          },
        },
      },
    });
  }

  async updateService(id: string, data: UpdateServiceDTO) {
    await this.database.serviceIcon.deleteMany({
      where: {
        serviceId: id,
      },
    });

    if (data.titleId) {
      await this.database.serviceTitle.update({
        where: {
          id: data.titleId,
        },
        data: {
          services: {
            disconnect: {
              id,
            },
          },
        },
      });
    }

    await this.database.service.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        icons: {
          create: [
            data.selectedIcon && {
              icon: {
                connect: {
                  id: data.selectedIcon.iconId,
                },
              },
              isSelected: true,
            },
            data.notSelectedIcon && {
              icon: {
                connect: {
                  id: data.notSelectedIcon.iconId,
                },
              },
              isSelected: false,
            },
          ],
        },
        ...(data.titleId && {
          serviceTitle: {
            connect: {
              id: data.titleId,
            },
          },
        }),
      },
    });
  }

  async deleteService(id: string) {
    await this.database.service.delete({
      where: {
        id,
      },
    });
  }

  async findServiceTitle(id: string) {
    const serviceTitle = await this.database.serviceTitle.findUnique({
      where: {
        id,
      },
      include: {
        services: {
          include: {
            icons: {
              include: {
                icon: true,
              },
            },
          },
        },
      },
    });

    if (!serviceTitle) {
      throw new ServiceException(SERVICE_ERROR_CODE.SERVICE_TITLE_NOT_FOUND);
    }

    return new ServiceTitleDTO(serviceTitle);
  }

  async findServiceTitles(args = {} as Prisma.ServiceTitleFindManyArgs) {
    const serviceTitles = await this.database.serviceTitle.findMany({
      ...args,
      include: {
        services: {
          include: {
            icons: {
              include: {
                icon: true,
              },
            },
          },
        },
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
            icons: {
              create: [
                {
                  isSelected: true,
                  icon: {
                    connect: {
                      id: service.selectedIcon.iconId,
                    },
                  },
                },
                {
                  isSelected: false,
                  icon: {
                    connect: {
                      id: service.notSelectedIcon.iconId,
                    },
                  },
                },
              ],
            },
          })),
        },
      },
    });

    return serviceTitle.id;
  }

  async updateServiceTitle(id: string, data: UpdateServiceTitleDTO) {
    await this.database.serviceTitle.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        services: data.services && {
          deleteMany: {},
          create: data.services.map((service) => ({
            name: service.name,
            icons: {
              create: [
                {
                  isSelected: true,
                  icon: {
                    connect: {
                      id: service.selectedIcon.iconId,
                    },
                  },
                },
                {
                  isSelected: false,
                  icon: {
                    connect: {
                      id: service.notSelectedIcon.iconId,
                    },
                  },
                },
              ],
            },
          })),
        },
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
