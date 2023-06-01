import { Injectable } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';

import { ALREADY_INTERESTED, ALREADY_LIKED, NOT_INTERESTED, NOT_LIKED, SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { SpaceRepository } from './space.repository';

@Injectable()
export class SpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async findSpace(id: string) {
    return await this.spaceRepository.findSpace(id);
  }

  async createLike(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isLiked = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (isLiked) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(ALREADY_LIKED));
    }

    await this.spaceRepository.createLike(userId, spaceId);
  }

  async deleteLike(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isLiked = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (!isLiked) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(NOT_LIKED));
    }

    await this.spaceRepository.deleteLike(userId, spaceId);
  }

  async createInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(ALREADY_INTERESTED));
    }

    await this.spaceRepository.createInterest(userId, spaceId);
  }

  async deleteInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (!isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(NOT_INTERESTED));
    }

    await this.spaceRepository.deleteInterest(userId, spaceId);
  }
}
