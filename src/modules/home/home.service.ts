import { Injectable } from '@nestjs/common';

import { HomeImage, Prisma, Slogan } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateHomeImageDTO, CreateSloganDTO, HomeDTO, UpdateHomeImageDTO, UpdateSloganDTO } from './dto';
import {
  HOME_ERROR_CODE,
  HOME_IMAGE_NO_DEFAULT,
  HOME_IMAGE_NOT_FOUND,
  SLOGAN_NO_DEFAULT,
  SLOGAN_NOT_FOUND,
} from './exception/errorCode';
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
    const transactionArgs: Prisma.PromiseType<any>[] = [];
    if (count === 0) {
      data.isDefault = true;
    } else if (count !== 0 && data.isDefault === true) {
      transactionArgs.push(this.updateHomeImageDefaultToFalse());
    }

    transactionArgs.push(
      this.database.homeImage.create({
        data,
      })
    );
    const result = await this.database.$transaction(transactionArgs);
    const home: HomeImage = result.find((query) => !query['id']);

    return home.id;
  }

  async updateHomeImage(id: string, data: UpdateHomeImageDTO) {
    const homeImage = await this.findHomeImage(id);
    const count = await this.countDefaultHome();

    //INFO: 현재 변경하려는 대상이 default인데, false로 바꾸는 경우
    if (count === 1 && homeImage.isDefault === true && data.isDefault === false) {
      throw new HomeException(HOME_ERROR_CODE.CONFLICT(HOME_IMAGE_NO_DEFAULT));
    }

    const transactionArgs: Prisma.PromiseType<any>[] = [];

    if (data.isDefault === true) {
      transactionArgs.push(this.updateHomeImageDefaultToFalse());
    }

    transactionArgs.push(
      this.database.homeImage.update({
        where: {
          id,
        },
        data,
      })
    );

    await this.database.$transaction(transactionArgs);
  }
  async deleteHomeImage(id: string) {
    const homeImage = await this.findHomeImage(id);
    const count = await this.countDefaultHome();

    if (count === 1 && homeImage.isDefault === true) {
      throw new HomeException(HOME_ERROR_CODE.CONFLICT(HOME_IMAGE_NO_DEFAULT));
    }

    await this.database.homeImage.delete({
      where: {
        id,
      },
    });
  }

  async findSlogan(id: string) {
    return await this.database.slogan.findUnique({
      where: {
        id,
      },
    });
  }

  async createSlogan(data: CreateSloganDTO) {
    const count = await this.countDefaultSlogan();
    const transactionArgs: Prisma.PromiseType<any>[] = [];
    if (count === 0) {
      data.isDefault = true;
    } else if (count !== 0 && data.isDefault === true) {
      transactionArgs.push(this.updateSloganDefaultToFalse());
    }

    transactionArgs.push(
      this.database.slogan.create({
        data,
      })
    );
    const result = await this.database.$transaction(transactionArgs);

    const slogan: Slogan = result.find((query) => !query['id']);

    return slogan.id;
  }

  async updateSlogan(id: string, data: UpdateSloganDTO) {
    const slogan = await this.findSlogan(id);
    const count = await this.countDefaultSlogan();
    //INFO: 현재 변경하려는 대상이 default인데, false로 바꾸는 경우
    if (count === 1 && slogan.isDefault === true && data.isDefault === false) {
      throw new HomeException(HOME_ERROR_CODE.CONFLICT(SLOGAN_NO_DEFAULT));
    }
    const transactionArgs: Prisma.PromiseType<any>[] = [];

    if (data.isDefault === true) {
      transactionArgs.push(this.updateSloganDefaultToFalse());
    }

    transactionArgs.push(
      this.database.slogan.update({
        where: {
          id,
        },
        data,
      })
    );
    await this.database.$transaction(transactionArgs);
  }

  async countDefaultHome() {
    return await this.database.homeImage.count({
      where: {
        isDefault: true,
      },
    });
  }

  updateHomeImageDefaultToFalse() {
    return this.database.homeImage.updateMany({
      where: {
        isDefault: true,
      },
      data: {
        isDefault: false,
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

  updateSloganDefaultToFalse() {
    return this.database.slogan.updateMany({
      where: {
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  }
}
