import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { Encrypt } from '@/common/encrypt';
import { PrismaService } from '@/database/prisma.service';

import {
  CreateHostAccountDTO,
  CreateHostDTO,
  HostAccountDTO,
  HostDTO,
  UpdateHostAccountDTO,
  UpdateHostDTO,
} from './dto';
import { HOST_ACCOUNT_NOT_FOUND, HOST_ERROR_CODE, HOST_NOT_FOUND } from './exception/errorCode';
import { HostException } from './exception/host.exception';

@Injectable()
export class HostRepository {
  constructor(private readonly database: PrismaService) {}

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
    });
    if (!host) {
      throw new HostException(HOST_ERROR_CODE.NOT_FOUND(HOST_NOT_FOUND));
    }

    return new HostDTO(host);
  }

  async checkHostByEmail(email: string) {
    const host = await this.database.host.findUnique({
      where: {
        email,
      },
    });
    if (host) {
      return false;
    }

    return new HostDTO(host);
  }

  async createHost(data: CreateHostDTO) {
    const salt = Encrypt.createSalt();
    const password = Encrypt.hashPassword(data.password, salt);

    const host = await this.database.host.create({
      data: {
        ...data,
        salt,
        password,
      },
    });

    return host.id;
  }

  async updateHost(id: string, data: UpdateHostDTO) {
    const updateArgs: Prisma.HostUpdateInput = data;

    if (data.password) {
      const salt = Encrypt.createSalt();
      updateArgs.salt = salt;
      updateArgs.password = Encrypt.hashPassword(data.password, salt);
    }

    await this.database.host.update({
      where: {
        id,
      },
      data: updateArgs,
    });

    return id;
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
      throw new HostException(HOST_ERROR_CODE.NOT_FOUND(HOST_ACCOUNT_NOT_FOUND));
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
      throw new HostException(HOST_ERROR_CODE.NOT_FOUND(HOST_ACCOUNT_NOT_FOUND));
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
