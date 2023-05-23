import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { UserService } from 'modules/user/user.service';

describe('UserService', () => {
  let service: UserService;
  let database: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    database = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    const users: Prisma.UserCreateInput[] = [
      {
        email: 'testUser@naver.com',
        name: 'testUser1',
        nickname: 'testUser',
        phoneNumber: '010-4040-4040',
      },
    ];
    await Promise.all(users.map((user) => database.user.create({ data: user })));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
