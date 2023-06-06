import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { SpaceRepository } from '@/modules/space/space.repository';

import { HOST_ERROR_CODE, HOST_SPACE_FIND_FORBIDDEN } from '../exception/errorCode';
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
    return await this.spaceRepository.createSpace(hostId, data);
  }
}
