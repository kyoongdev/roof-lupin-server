import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { EncryptProvider } from '@/common/encrypt';
import { PrismaService } from '@/database/prisma.service';

import {
  BlockHostDTO,
  CreateHostAccountDTO,
  CreateHostDTO,
  HostAccountDTO,
  HostDTO,
  UpdateHostAccountDTO,
  UpdateHostDTO,
} from './dto';
import { HostAuthDetailDTO } from './dto/host-auth-detail.dto';
import { HostDetailDTO } from './dto/host-detail.dto';
import { HOST_ERROR_CODE } from './exception/errorCode';
import { HostException } from './exception/host.exception';

@Injectable()
export class HostRepository {
  constructor(private readonly database: PrismaService, private readonly encrypt: EncryptProvider) {}

  async findHostBySpaceId(spaceId: string) {
    const host = await this.database.host.findFirst({
      where: {
        spaces: {
          some: {
            id: spaceId,
          },
        },
      },
      include: {
        hostAccount: true,
      },
    });
    if (!host) {
      throw new HostException(HOST_ERROR_CODE.HOST_NOT_FOUND);
    }

    return new HostDetailDTO(host);
  }

  async findHosts(args = {} as Prisma.HostFindManyArgs) {
    const hosts = await this.database.host.findMany({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip: args.skip,
      take: args.take,
    });

    return hosts.map((host) => new HostDTO(host));
  }

  async countHosts(args = {} as Prisma.HostCountArgs) {
    return this.database.host.count({
      where: args.where,
    });
  }

  async findHost(id: string) {
    const host = await this.database.host.findUnique({
      where: {
        id,
      },
      include: {
        hostAccount: true,
      },
    });
    if (!host) {
      throw new HostException(HOST_ERROR_CODE.HOST_NOT_FOUND);
    }

    return new HostDetailDTO(host);
  }

  async findHostDetail(id: string) {
    const host = await this.database.host.findUnique({
      where: {
        id,
      },
      include: {
        hostAccount: true,
      },
    });

    if (!host) {
      throw new HostException(HOST_ERROR_CODE.HOST_NOT_FOUND);
    }

    return new HostDetailDTO(host);
  }

  async checkHostByEmail(email: string) {
    const host = await this.database.host.findUnique({
      where: {
        email,
      },
    });

    if (!host) {
      return false;
    }

    return new HostDTO(host);
  }

  async findHostByEmail(email: string) {
    const host = await this.database.host.findUnique({
      where: {
        email,
      },
    });
    if (!host) {
      throw new HostException(HOST_ERROR_CODE.HOST_NOT_FOUND);
    }

    return new HostAuthDetailDTO(host);
  }

  async createHost(data: CreateHostDTO) {
    const salt = this.encrypt.createSalt();
    const password = this.encrypt.hashPassword(salt, data.password);

    const host = await this.database.host.create({
      data: {
        ...data,
        salt,
        password,
        hostAccount: {
          create: {
            account: '',
            accountOwner: '',
            bankCode: '',
          },
        },
      },
    });

    return host.id;
  }

  async updateHost(id: string, data: UpdateHostDTO) {
    const updateArgs: Prisma.HostUpdateInput = data;

    if (data.password) {
      const salt = this.encrypt.createSalt();
      updateArgs.salt = salt;
      const password = this.encrypt.hashPassword(salt, data.password);
      updateArgs.password = password;
    }

    await this.database.host.update({
      where: {
        id,
      },
      data: updateArgs,
    });

    return id;
  }

  async blockHost(id: string, data: BlockHostDTO) {
    await this.database.host.update({
      where: {
        id,
      },
      data: {
        isBlocked: true,
        unBlockAt: data.unBlockAt,
      },
    });
  }

  async unBlockHost(id: string) {
    await this.database.host.update({
      where: {
        id,
      },
      data: {
        isBlocked: false,
        unBlockAt: null,
      },
    });
  }

  async deleteHost(id: string) {
    await this.database.host.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteHost(id: string) {
    await this.database.host.delete({
      where: {
        id,
      },
    });
  }

  async findHostAccount(id: string) {
    const hostAccount = await this.database.hostAccount.findUnique({
      where: {
        id,
      },
    });
    if (!hostAccount) {
      throw new HostException(HOST_ERROR_CODE.HOST_ACCOUNT_NOT_FOUND);
    }

    return new HostAccountDTO(hostAccount);
  }

  async findHostAccountByHostId(hostId: string) {
    const hostAccount = await this.database.hostAccount.findUnique({
      where: {
        hostId,
      },
    });
    if (!hostAccount) {
      throw new HostException(HOST_ERROR_CODE.HOST_ACCOUNT_NOT_FOUND);
    }

    return new HostAccountDTO(hostAccount);
  }

  async createHostAccount(hostId: string, data: CreateHostAccountDTO) {
    const hostAccount = await this.database.hostAccount.create({
      data: {
        ...data,
        host: {
          connect: {
            id: hostId,
          },
        },
      },
    });

    return hostAccount.id;
  }

  async updateHostAccount(id: string, data: UpdateHostAccountDTO) {
    await this.database.hostAccount.update({
      where: {
        id,
      },
      data,
    });

    return id;
  }

  async updateHostAccountByHostId(hostId: string, data: UpdateHostAccountDTO) {
    await this.database.hostAccount.update({
      where: {
        hostId,
      },
      data,
    });
  }

  async deleteHostAccount(id: string) {
    await this.database.hostAccount.delete({
      where: {
        id,
      },
    });
  }
}
