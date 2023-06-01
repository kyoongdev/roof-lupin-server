import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { UpdateHomeImageDTO } from '@/modules/home/dto';
import { HOME_ERROR_CODE, HOME_IMAGE_NO_DEFAULT } from '@/modules/home/exception/errorCode';
import { HomeException } from '@/modules/home/exception/home.exception';
import { HomeService } from '@/modules/home/home.service';

import { seedHome } from './seed';

describe('HomeService', () => {
  let service: HomeService;
  let database: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [HomeService, PrismaService],
    }).compile();

    service = module.get<HomeService>(HomeService);
    database = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  beforeEach(async () => {
    await database.homeImage.deleteMany({});
    await database.slogan.deleteMany({});
    await seedHome(database);
  });

  describe('update test', () => {
    it('성공', async () => {
      const notDefault = await service.findHomeImage('notDefault');

      await service.updateHomeImage(
        notDefault.id,
        new UpdateHomeImageDTO({
          isDefault: true,
        })
      );

      const defaultImage = await service.findHomeImage('default');
      const updatedNotDefault = await service.findHomeImage('notDefault');
      expect(defaultImage.isDefault).toBe(false);
      expect(updatedNotDefault.isDefault).toBe(true);
    });

    it('실패', async () => {
      const defaultImage = await service.findHomeImage('default');

      expect(
        async () =>
          await service.updateHomeImage(
            defaultImage.id,
            new UpdateHomeImageDTO({
              isDefault: false,
            })
          )
      ).rejects.toThrowError(new HomeException(HOME_ERROR_CODE.CONFLICT(HOME_IMAGE_NO_DEFAULT)));
    });
  });
});
