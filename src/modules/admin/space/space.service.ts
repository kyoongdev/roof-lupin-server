import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { SpaceDTO, UpdateSpaceDTO } from '@/modules/space/dto';
import { SpaceRepository } from '@/modules/space/space.repository';
import { AdminSpaceSQL } from '@/sql';

import { AdminFindSpacesQuery } from '../dto/query/space';
import { SpaceCountDTO, UpdateSpaceOrderDTO } from '../dto/space';

@Injectable()
export class AdminSpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async findSpace(id: string) {
    return await this.spaceRepository.findSpace(id);
  }

  async findSpaceIds() {
    return await this.spaceRepository.findSpaceIds();
  }

  async countSpaces() {
    const count = await this.spaceRepository.countSpaces();
    return new SpaceCountDTO({ count });
  }

  async findPagingSpaces(paging: PagingDTO, query: AdminFindSpacesQuery) {
    let where: Prisma.Sql = Prisma.empty;

    if (query.title) {
      where = Prisma.sql`WHERE sp.title LIKE '%${Prisma.raw(query.title)}%'`;
    } else if (query.isApproved) {
      where = Prisma.sql`WHERE sp.isApproved = ${query.isApproved}`;
    } else if (query.isPublic) {
      where = Prisma.sql`WHERE sp.isPublic = ${query.isPublic}`;
    }

    const sqlQuery = new AdminSpaceSQL({
      isHoliday: false,
      paging: paging.getSqlPaging(),
      query,
    });

    const { spaces, count } = await this.spaceRepository.findSpacesWithSQL(sqlQuery.getSQLQuery());

    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async updateSpace(id: string, data: UpdateSpaceDTO) {
    await this.findSpace(id);
    await this.spaceRepository.updateSpace(id, data);
  }

  async updateSpaceOrder(id: string, data: UpdateSpaceOrderDTO) {
    await this.findSpace(id);
    await this.spaceRepository.updateSpaceOrder(id, data.orderNo);
  }

  async deleteSpaceOrder(id: string) {
    await this.findSpace(id);
    await this.spaceRepository.deleteSpaceOrder(id);
  }

  async deleteSpace(id: string) {
    await this.findSpace(id);
    await this.spaceRepository.deleteSpace(id);
  }
}
