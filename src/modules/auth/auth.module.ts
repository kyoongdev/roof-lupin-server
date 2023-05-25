import { Module } from '@nestjs/common';

import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserRepository, AdminRepository, HostRepository, Jsonwebtoken],
  controllers: [AuthController],
})
export class AuthModule {}
