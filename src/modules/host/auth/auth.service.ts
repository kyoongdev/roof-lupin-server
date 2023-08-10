import { Injectable } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { TokenPayload } from '@/interface/token.interface';
import { HostAuthDTO, TokenDTO } from '@/modules/auth/dto';
import { AuthException } from '@/modules/auth/exception/auth.exception';
import {
  ALREADY_EXIST_HOST,
  AUTH_ERROR_CODE,
  WRONG_ACCESS_TOKEN,
  WRONG_ID,
  WRONG_KEY,
  WRONG_PASSWORD,
  WRONG_REFRESH_TOKEN,
} from '@/modules/auth/exception/errorCode';
import { Jsonwebtoken } from '@/utils/jwt';

import { CreateHostDTO } from '../dto';
import { HostRepository } from '../host.repository';

@Injectable()
export class HostAuthService {
  constructor(
    private readonly hostRepository: HostRepository,
    private readonly jwt: Jsonwebtoken,
    private readonly encrypt: EncryptProvider
  ) {}

  async hostLogin(props: HostAuthDTO) {
    const host = await this.hostRepository.findHostByEmail(props.email);

    const isMatch = this.encrypt.comparePassword(host.salt, props.password, host.password);
    if (!isMatch) {
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_PASSWORD));
    }

    const token = await this.jwt.createTokens({ id: host.id, role: 'HOST' });
    return token;
  }

  async hostRegister(props: CreateHostDTO) {
    const isExist = await this.hostRepository.checkHostByEmail(props.email);

    if (isExist) {
      throw new AuthException(AUTH_ERROR_CODE.CONFLICT(ALREADY_EXIST_HOST));
    }

    const host = await this.hostRepository.createHost(props);
    const token = await this.jwt.createTokens({ id: host, role: 'HOST' });
    return token;
  }

  async refresh(tokens: TokenDTO) {
    const { accessToken, refreshToken } = tokens;
    const accessTokenPayload = this.jwt.verifyJwt<TokenPayload>(accessToken, {
      ignoreExpiration: true,
    }) as TokenPayload | null | undefined;
    const refreshTokenPayload = this.jwt.verifyJwt<TokenPayload>(refreshToken) as TokenPayload | null | undefined;

    if (!accessTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ACCESS_TOKEN));
    if (!refreshTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_REFRESH_TOKEN));

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_KEY));
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ID));

    return this.jwt.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
  }
}
