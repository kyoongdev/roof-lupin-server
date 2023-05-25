import { Injectable } from '@nestjs/common';

import type { SignOptions } from 'jsonwebtoken';
import { AdminRepository } from 'modules/admin/admin.repository';
import { HostRepository } from 'modules/host/host.repository';
import { UserRepository } from 'modules/user/user.repository';
import { Jsonwebtoken } from 'utils/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly hostRepository: HostRepository,
    private readonly jwt: Jsonwebtoken
  ) {}

  async adminLogin(email: string, password: string) {
    const admin = await this.adminRepository.findAdminByUserId(email);
    //TODO: password check logic
    // const isMatch = await admin.comparePassword(password);
    // if (!isMatch) {
    //   return null;
    // }
    const token = await this.jwt.signJwt({ id: admin.id, role: 'admin' });
    return token;
  }

  async createTokens<T extends object>(value: T, options?: SignOptions) {}
}
