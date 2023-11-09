import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { EncryptProvider } from '@/common/encrypt';
import { PrismaService } from '@/database/prisma.service';

import { AdminDetailDTO, AdminDTO, UpdateAdminDTO } from './dto';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { AdminException } from './exception/admin.exception';
import { ADMIN_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class AdminRepository {
  constructor(private readonly database: PrismaService, private readonly encrypt: EncryptProvider) {}

  async findAdmins(args = {} as Prisma.AdminFindManyArgs) {
    const admins = await this.database.admin.findMany({
      ...args,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    });

    return admins.map((admin) => new AdminDTO(admin));
  }

  async countAdmins(args = {} as Prisma.AdminCountArgs) {
    return await this.database.admin.count(args);
  }

  async findAdmin(id: string) {
    const admin = await this.database.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new AdminException(ADMIN_ERROR_CODE.ADMIN_NOT_FOUND);
    }
    return new AdminDTO(admin);
  }

  async findAdminDetail(id: string) {
    const admin = await this.database.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new AdminException(ADMIN_ERROR_CODE.ADMIN_NOT_FOUND);
    }
    return new AdminDetailDTO(admin);
  }

  async findAdminByUserId(userId: string) {
    const admin = await this.database.admin.findFirst({
      where: {
        userId,
      },
    });

    if (!admin) {
      throw new AdminException(ADMIN_ERROR_CODE.ADMIN_NOT_FOUND);
    }

    return new AdminDetailDTO(admin);
  }

  async checkAdminByUserId(userId: string) {
    const admin = await this.database.admin.findFirst({
      where: {
        userId,
      },
    });

    if (!admin) {
      return false;
    }

    return new AdminDetailDTO(admin);
  }

  async createAdmin(data: CreateAdminDTO, byAdmin = false) {
    const salt = this.encrypt.createSalt();
    const admin = await this.database.admin.create({
      data: {
        ...data,
        password: this.encrypt.hashPassword(salt, data.password),
        salt,
        isAccepted: byAdmin,
      },
    });

    return admin.id;
  }

  async updateAdmin(id: string, data: UpdateAdminDTO) {
    const updateArgs: Prisma.AdminUpdateInput = data;

    if (data.password) {
      const salt = this.encrypt.createSalt();
      updateArgs.salt = salt;
      updateArgs.password = this.encrypt.hashPassword(salt, data.password);
    }
    await this.database.admin.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteAdmin(id: string) {
    await this.database.admin.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteAdmin(id: string) {
    await this.database.admin.delete({
      where: {
        id,
      },
    });
  }
}
