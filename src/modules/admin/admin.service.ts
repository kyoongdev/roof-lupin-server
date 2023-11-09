import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { EncryptProvider } from '@/common/encrypt';

import { AdminRepository } from './admin.repository';
import {
  AdminDTO,
  CheckAdminDTO,
  CreateAdminDTO,
  IsAdminExistsDTO,
  UpdateAdminDTO,
  UpdateAdminPasswordDTO,
} from './dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository, private readonly encrypt: EncryptProvider) {}

  async findAdmin(id: string) {
    return await this.adminRepository.findAdmin(id);
  }

  async findPagingAdmins(paging: PagingDTO, args = {} as Prisma.AdminFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.adminRepository.countAdmins({
      where: args.where,
    });
    const admins = await this.adminRepository.findAdmins({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip,
      take,
    });

    return new PaginationDTO<AdminDTO>(admins, { paging, count });
  }

  async checkAdminWithUserId(data: CheckAdminDTO) {
    const isChecked = await this.adminRepository.checkAdminByUserId(data.userId);

    return new IsAdminExistsDTO({ isExists: Boolean(isChecked) });
  }

  async createAdmin(data: CreateAdminDTO, byAdmin = false) {
    return await this.adminRepository.createAdmin(data, byAdmin);
  }

  async updateAdminPassword(data: UpdateAdminPasswordDTO) {
    const admin = await this.adminRepository.findAdminByUserId(data.userId);
    const password = this.encrypt.hashPassword(admin.salt, data.password);

    await this.adminRepository.updateAdmin(admin.id, { password });
  }

  async updateAdmin(id: string, data: UpdateAdminDTO) {
    await this.findAdmin(id);
    await this.adminRepository.updateAdmin(id, data);
  }

  async deleteAdmin(id: string) {
    await this.findAdmin(id);
    await this.adminRepository.deleteAdmin(id);
  }

  async hardDeleteAdmin(id: string) {
    await this.findAdmin(id);
    await this.adminRepository.hardDeleteAdmin(id);
  }
}
