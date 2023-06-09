import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { UpdateSpaceDTO } from '@/modules/space/dto/update-space.dto';
import { SpaceRepository } from '@/modules/space/space.repository';

import {
  HOST_ERROR_CODE,
  HOST_SPACE_FIND_FORBIDDEN,
  HOST_SPACE_MUTATION_FORBIDDEN,
  HOST_SPACE_RENTAL_TYPE_BAD_REQUEST,
} from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostSpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async findSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(HOST_SPACE_FIND_FORBIDDEN));
    }

    return space;
  }

  async findSpaces(hostId: string, args = {} as Prisma.SpaceFindManyArgs) {
    return await this.spaceRepository.findSpaces({
      where: {
        hostId,
        ...args.where,
      },
    });
  }

  async createSpace(hostId: string, data: CreateSpaceDTO) {
    const rentalType = data.rentalTypes;
    const timeCostCount = rentalType.filter((item) => item.rentalType === 1).length;
    if (timeCostCount > 1) {
      throw new HostException(HOST_ERROR_CODE.BAD_REQUEST(HOST_SPACE_RENTAL_TYPE_BAD_REQUEST));
    }

    return await this.spaceRepository.createSpace(hostId, data);
  }

  async updateSpace(id: string, hostId: string, data: UpdateSpaceDTO) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(HOST_SPACE_MUTATION_FORBIDDEN));
    }

    await this.spaceRepository.updateSpace(id, data);
  }

  async deleteSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(HOST_SPACE_MUTATION_FORBIDDEN));
    }

    await this.spaceRepository.deleteSpace(id);
  }

  async hardDeleteSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.FORBIDDEN(HOST_SPACE_MUTATION_FORBIDDEN));
    }

    await this.spaceRepository.hardDeleteSpace(id);
  }
}
