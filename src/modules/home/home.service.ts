import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateHomeImageDTO, HomeDTO, UpdateHomeImageDTO } from './dto';
import { HOME_ERROR_CODE, HOME_IMAGE_NO_DEFAULT, HOME_IMAGE_NOT_FOUND, SLOGAN_NOT_FOUND } from './exception/errorCode';
import { HomeException } from './exception/home.exception';

@Injectable()
export class HomeService {
  constructor(private readonly database: PrismaService) {}

  async findHome() {
    const homeImage = await this.database.homeImage.findFirst({
      where: {
        isDefault: true,
      },
    });
    if (!homeImage) {
      throw new HomeException(HOME_ERROR_CODE.NOT_FOUND(HOME_IMAGE_NOT_FOUND));
    }

    const slogan = await this.database.slogan.findFirst({
      where: {
        isDefault: true,
      },
    });

    if (!slogan) {
      throw new HomeException(HOME_ERROR_CODE.NOT_FOUND(SLOGAN_NOT_FOUND));
    }

    return new HomeDTO({
      homeImage: homeImage.url,
      homeImageId: homeImage.id,
      content: slogan.content,
      sloganId: slogan.id,
    });
  }

  async findHomeImage(id: string) {
    const homeImage = await this.database.homeImage.findUnique({
      where: {
        id,
      },
    });

    if (!homeImage) {
      throw new HomeException(HOME_ERROR_CODE.NOT_FOUND(HOME_IMAGE_NOT_FOUND));
    }
    return homeImage;
  }

  async createHomeImage(data: CreateHomeImageDTO) {
    const count = await this.countDefaultHome();

    if (count === 0) {
      data.isDefault = true;
    }

    const home = await this.database.homeImage.create({
      data,
    });
    return home.id;
  }

  async updateHomeImage(id: string, data: UpdateHomeImageDTO) {
    const homeImage = await this.findHomeImage(id);

    const count = await this.countDefaultHome();

    //INFO: 현재 변경하려는 대상이 default인데, false로 바꾸는 경우
    if (count === 1 && homeImage.isDefault === true && data.isDefault === false) {
      throw new HomeException(HOME_ERROR_CODE.CONFLICT(HOME_IMAGE_NO_DEFAULT));
    }

    if (data.isDefault === true) {
      await this.database.homeImage.updateMany({
        where: {
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    await this.database.homeImage.update({
      where: {
        id,
      },
      data,
    });
  }

  async countDefaultHome() {
    return await this.database.homeImage.count({
      where: {
        isDefault: true,
      },
    });
  }

  async countDefaultSlogan() {
    return await this.database.slogan.count({
      where: {
        isDefault: true,
      },
    });
  }
}
