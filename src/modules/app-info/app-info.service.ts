import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { AppInfoDTO, CreateAppInfoDTO, UpdateAppInfoDTO } from './dto';
import { AppInfoException } from './exception/app-info.exception';
import { APP_INFO_ERROR_CODE, APP_INFO_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class AppInfoService {
  constructor(private readonly database: PrismaService) {}

  async findAppInfoById(id: string) {
    const appInfo = await this.database.appInfo.findUnique({
      where: {
        id,
      },
    });
    if (!appInfo) {
      throw new AppInfoException(APP_INFO_ERROR_CODE.NOT_FOUND(APP_INFO_NOT_FOUND));
    }

    return new AppInfoDTO(appInfo);
  }

  async findAppInfos() {
    const appInfos = await this.database.appInfo.findMany();
    return appInfos.map((appInfo) => new AppInfoDTO(appInfo));
  }

  async createAppInfo(data: CreateAppInfoDTO) {
    const appInfo = await this.database.appInfo.create({
      data,
    });

    return appInfo.id;
  }

  async updateAppInfo(id: string, data: UpdateAppInfoDTO) {
    await this.findAppInfoById(id);
    await this.database.appInfo.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAppInfo(id: string) {
    await this.findAppInfoById(id);
    await this.database.appInfo.delete({
      where: {
        id,
      },
    });
  }
}
