import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserRepository } from 'modules/user/user.repository';

@Module({
  providers: [AdminService, UserRepository],
  controllers: [AdminController],
})
export class AdminModule {}
