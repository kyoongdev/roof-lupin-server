import { Injectable } from '@nestjs/common';

import { MainImage, Prisma, Slogan } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';

import {
  CreateMainImageDTO,
  CreateSloganDTO,
  MainDTO,
  MainImageDTO,
  SloganDTO,
  UpdateMainImageDTO,
  UpdateSloganDTO,
} from './dto';
import {
  MAIN_ERROR_CODE,
  MAIN_IMAGE_NO_DEFAULT,
  MAIN_IMAGE_NOT_FOUND,
  SLOGAN_NO_DEFAULT,
  SLOGAN_NOT_FOUND,
} from './exception/errorCode';
import { MainException } from './exception/main.exception';

@Injectable()
export class MainService {
  constructor(private readonly database: PrismaService) {}

  async findMain() {
    const mainImage = await this.database.mainImage.findFirst({
      where: {
        isDefault: true,
      },
    });
    if (!mainImage) {
      throw new MainException(MAIN_ERROR_CODE.NOT_FOUND(MAIN_IMAGE_NOT_FOUND));
    }

    const slogan = await this.database.slogan.findFirst({
      where: {
        isDefault: true,
      },
    });

    if (!slogan) {
      throw new MainException(MAIN_ERROR_CODE.NOT_FOUND(SLOGAN_NOT_FOUND));
    }

    return new MainDTO({
      mainImage: mainImage.url,
      mainImageId: mainImage.id,
      content: slogan.content,
      sloganId: slogan.id,
    });
  }

  async findMainImage(id: string) {
    const mainImage = await this.database.mainImage.findUnique({
      where: {
        id,
      },
    });

    if (!mainImage) {
      throw new MainException(MAIN_ERROR_CODE.NOT_FOUND(MAIN_IMAGE_NOT_FOUND));
    }
    return mainImage;
  }

  async findMainImages(args = {} as Prisma.MainImageFindManyArgs) {
    const mainImages = await this.database.mainImage.findMany(args);
    return mainImages.map((mainImage) => new MainImageDTO(mainImage));
  }

  async countMainImages(args = {} as Prisma.MainImageCountArgs) {
    return await this.database.mainImage.count(args);
  }

  async findPagingMainImages(paging: PagingDTO, args = {} as Prisma.MainImageFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const mainImages = await this.findMainImages({
      where: args.where,
      skip,
      take,
    });
    const count = await this.countMainImages({
      where: args.where,
    });
    return new PaginationDTO<MainImageDTO>(mainImages, { count, paging });
  }

  async createMainImage(data: CreateMainImageDTO) {
    const count = await this.countDefaultMainImages();
    const transactionArgs: Prisma.PromiseType<any>[] = [];
    if (count === 0) {
      data.isDefault = true;
    } else if (count !== 0 && data.isDefault === true) {
      transactionArgs.push(this.updateMainImageDefaultToFalse());
    }

    transactionArgs.push(
      this.database.mainImage.create({
        data,
      })
    );
    const result = await this.database.$transaction(transactionArgs);

    const main: MainImage = result.find((query) => !!query['id']);

    return main.id;
  }

  async updateMainImage(id: string, data: UpdateMainImageDTO) {
    const mainImage = await this.findMainImage(id);
    const count = await this.countDefaultMainImages();

    //INFO: 현재 변경하려는 대상이 default인데, false로 바꾸는 경우
    if (count === 1 && mainImage.isDefault === true && data.isDefault === false) {
      throw new MainException(MAIN_ERROR_CODE.CONFLICT(MAIN_IMAGE_NO_DEFAULT));
    }

    const transactionArgs: Prisma.PromiseType<any>[] = [];

    if (data.isDefault === true) {
      transactionArgs.push(this.updateMainImageDefaultToFalse());
    }

    transactionArgs.push(
      this.database.mainImage.update({
        where: {
          id,
        },
        data,
      })
    );

    await this.database.$transaction(transactionArgs);
  }
  async deleteMainImage(id: string) {
    const mainImage = await this.findMainImage(id);
    const count = await this.countDefaultMainImages();

    if (count === 1 && mainImage.isDefault === true) {
      throw new MainException(MAIN_ERROR_CODE.CONFLICT(MAIN_IMAGE_NO_DEFAULT));
    }

    await this.database.mainImage.delete({
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
  async findSlogans(args = {} as Prisma.SloganFindManyArgs) {
    const slogans = await this.database.slogan.findMany(args);
    return slogans.map((slogan) => new SloganDTO(slogan));
  }

  async countSlogans(args = {} as Prisma.SloganCountArgs) {
    return await this.database.slogan.count(args);
  }

  async findPagingSlogans(paging: PagingDTO, args = {} as Prisma.SloganFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const slogans = await this.findSlogans({
      where: args.where,
      skip,
      take,
    });
    const count = await this.countSlogans({ where: args.where });
    return new PaginationDTO<SloganDTO>(slogans, { count, paging });
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

    const slogan: Slogan = result.find((query) => !!query['id']);

    return slogan.id;
  }

  async updateSlogan(id: string, data: UpdateSloganDTO) {
    const slogan = await this.findSlogan(id);
    const count = await this.countDefaultSlogan();

    //INFO: 현재 변경하려는 대상이 default인데, false로 바꾸는 경우
    if (count === 1 && slogan.isDefault === true && data.isDefault === false) {
      throw new MainException(MAIN_ERROR_CODE.CONFLICT(SLOGAN_NO_DEFAULT));
    }
    const transactionArgs: Prisma.PromiseType<any>[] = [];

    if (data.isDefault === true) {
      // transactionArgs.push(this.updateSloganDefaultToFalse());
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

  async deleteSlogan(id: string) {
    const slogan = await this.findSlogan(id);
    const count = await this.countDefaultSlogan();

    if (count === 1 && slogan.isDefault === true) {
      throw new MainException(MAIN_ERROR_CODE.CONFLICT(SLOGAN_NO_DEFAULT));
    }

    await this.database.slogan.delete({
      where: {
        id,
      },
    });
  }

  async countDefaultMainImages() {
    return await this.database.mainImage.count({
      where: {
        isDefault: true,
      },
    });
  }

  updateMainImageDefaultToFalse() {
    return this.database.mainImage.updateMany({
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
