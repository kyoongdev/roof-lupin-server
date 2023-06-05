import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { SpaceRepository } from '@/modules/space/space.repository';

@Injectable()
export class HostSpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async findSpace(id: string) {
    return await this.spaceRepository.findSpace(id);
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
    return await this.spaceRepository.createSpace(hostId, data);
  }
}
