import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'modules/user/user.repository';
import { AdminRepository } from 'modules/admin/admin.repository';
import { HostRepository } from 'modules/host/host.repository';
import { Jsonwebtoken } from 'utils/jwt';

@Module({
  providers: [AuthService, UserRepository, AdminRepository, HostRepository, Jsonwebtoken],
  controllers: [AuthController],
})
export class AuthModule {}
