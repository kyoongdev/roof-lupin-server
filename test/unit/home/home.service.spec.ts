import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { UpdateHomeImageDTO, UpdateSloganDTO } from '@/modules/home/dto';
import { HOME_ERROR_CODE, HOME_IMAGE_NO_DEFAULT, SLOGAN_NO_DEFAULT } from '@/modules/home/exception/errorCode';
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
    await database.homeImage.deleteMany({});
    await database.slogan.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('image update test', () => {
    beforeEach(async () => {
      await seedHome(database);
    });
    afterEach(async () => {
      await database.homeImage.deleteMany({});
      await database.slogan.deleteMany({});
    });

    it('홈 이미지 성공', async () => {
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

    it('홈 이미지 실패', async () => {
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

  describe('slogan update test', () => {
    beforeEach(async () => {
      await seedHome(database);
    });

    afterEach(async () => {
      await database.homeImage.deleteMany({});
      await database.slogan.deleteMany({});
    });
    it('슬로건 성공', async () => {
      const notDefault = await service.findSlogan('notDefault');

      await service.updateSlogan(
        notDefault.id,
        new UpdateSloganDTO({
          isDefault: true,
        })
      );

      const defaultSlogan = await service.findSlogan('default');
      const updatedNotDefault = await service.findSlogan('notDefault');
      expect(defaultSlogan.isDefault).toBe(false);
      expect(updatedNotDefault.isDefault).toBe(true);
    });

    it('슬로건 실패', async () => {
      const defaultSlogan = await service.findSlogan('default');

      expect(
        async () =>
          await service.updateSlogan(
            defaultSlogan.id,
            new UpdateSloganDTO({
              isDefault: false,
            })
          )
      ).rejects.toThrowError(new HomeException(HOME_ERROR_CODE.CONFLICT(SLOGAN_NO_DEFAULT)));
    });
  });
});
