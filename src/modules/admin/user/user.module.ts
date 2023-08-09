import { Module } from '@nestjs/common';

import { AdminUserController } from './user.controller';
import { AdminUserRepository } from './user.repository';
import { AdminUserService } from './user.service';

@Module({
  providers: [AdminUserService, AdminUserRepository],
  exports: [AdminUserService, AdminUserRepository],
  controllers: [AdminUserController],
})
export class AdminUserModule {}
