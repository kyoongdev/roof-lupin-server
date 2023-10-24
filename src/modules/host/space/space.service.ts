import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { FileService } from '@/modules/file/file.service';
import { UpdateRentalTypeDTO } from '@/modules/rental-type/dto';
import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';
import { SpaceDTO } from '@/modules/space/dto';
import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { UpdateSpaceDTO } from '@/modules/space/dto/update-space.dto';
import { SpaceRepository } from '@/modules/space/space.repository';

import { HostSpaceCountDTO } from '../dto/space';
import { HOST_ERROR_CODE } from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostSpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly fileService: FileService
  ) {}

  async countSpaces(hostId: string) {
    const count = await this.spaceRepository.countSpaces({
      where: {
        hostId,
      },
    });

    return new HostSpaceCountDTO({ count });
  }

  async findSpaceIds(hostId: string) {
    return await this.spaceRepository.findSpaceIds({
      where: {
        hostId,
      },
    });
  }

  async findSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_FIND_FORBIDDEN);
    }

    return space;
  }

  async findPagingSpaces(paging: PagingDTO, hostId: string, args = {} as Prisma.SpaceFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.spaceRepository.countSpaces({
      where: {
        hostId,
        ...args.where,
      },
    });
    const spaces = await this.spaceRepository.findSpaces({
      where: {
        hostId,
        ...args.where,
      },
      skip,
      take,
    });
    return new PaginationDTO<SpaceDTO>(spaces, { paging, count });
  }

  async findSpaces(hostId: string, args = {} as Prisma.SpaceFindManyArgs) {
    return await this.spaceRepository.findSpaces({
      where: {
        hostId,
        ...args.where,
      },
    });
  }

  async findSpaceRentalType(spaceId: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(spaceId);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_FIND_FORBIDDEN);
    }
    return await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
      },
    });
  }

  async createSpace(hostId: string, data: CreateSpaceDTO) {
    return await this.spaceRepository.createSpace(hostId, data);
  }
  async updateRentalType(spaceId: string, rentalTypeId: string, hostId: string, data: UpdateRentalTypeDTO) {
    const space = await this.spaceRepository.findSpace(spaceId);
    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }
    const rentalType = await this.rentalTypeRepository.findRentalType(rentalTypeId);

    if (space.id !== rentalType.spaceId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }

    await this.rentalTypeRepository.updateRentalType(rentalTypeId, data);
  }

  async updateSpace(id: string, hostId: string, data: UpdateSpaceDTO) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }
    if (data.images) {
      await Promise.all(
        data.images.map(async (image) => {
          await this.fileService.deleteFile(image);
        })
      );
    }
    data.setIsApproved(false);
    await this.spaceRepository.updateSpace(id, data);
  }

  async deleteSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }

    if (space.images) {
      await Promise.all(
        space.images.map(async (image) => {
          await this.fileService.deleteFile(image.url);
        })
      );
    }

    await this.spaceRepository.deleteSpace(id);
  }

  async hardDeleteSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }

    await this.spaceRepository.hardDeleteSpace(id);
  }

  async setMainSpace(id: string, hostId: string) {
    const mainSpace = await this.spaceRepository.getMainSpace(hostId);

    if (mainSpace.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }

    if (mainSpace) {
      await this.spaceRepository.unsetMainSpace(id);
    }
    await this.spaceRepository.setMainSpace(id);
  }

  async unsetMainSpace(id: string, hostId: string) {
    const space = await this.spaceRepository.findSpace(id);

    if (space.host.id !== hostId) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_MUTATION_FORBIDDEN);
    }

    await this.spaceRepository.unsetMainSpace(id);
  }
}
