import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { AdminRepository } from './admin.repository';
import { AdminDTO, CreateAdminDTO, UpdateAdminDTO } from './dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

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
        deletedAt: null,
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

  async createAdmin(data: CreateAdminDTO, byAdmin = false) {
    return await this.adminRepository.createAdmin(data, byAdmin);
  }

  async updateAdmin(id: string, data: UpdateAdminDTO) {
    await this.adminRepository.updateAdmin(id, data);
  }

  async deleteAdmin(id: string) {
    await this.adminRepository.deleteAdmin(id);
  }

  async hardDeleteAdmin(id: string) {
    await this.adminRepository.hardDeleteAdmin(id);
  }
}
