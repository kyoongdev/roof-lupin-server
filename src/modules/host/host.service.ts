import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { EncryptProvider } from '@/common/encrypt';
import { PortOneProvider } from '@/utils';

import { CertificatePhoneDTO } from '../user/dto/certificate-phone.dto';

import {
  CertificationDTO,
  CheckHostDTO,
  CreateHostAccountDTO,
  IsHostCheckedDTO,
  IsHostExistsDTO,
  NewPasswordDTO,
  UpdateHostAccountDTO,
  UpdateHostDTO,
  UpdateHostPasswordDTO,
} from './dto';
import { IsHostExistsQuery } from './dto/query';
import { HOST_ERROR_CODE } from './exception/errorCode';
import { HostException } from './exception/host.exception';
import { HostRepository } from './host.repository';

@Injectable()
export class HostService {
  constructor(
    private readonly hostRepository: HostRepository,
    private readonly encrypt: EncryptProvider,
    private readonly portOneProvider: PortOneProvider
  ) {}

  async certificateUser(data: CertificatePhoneDTO) {
    const result = await this.portOneProvider.validateCertification(data.imp_uid);
    return new CertificationDTO(result);
  }

  async findHostBySpaceId(spaceId: string) {
    return await this.hostRepository.findHostBySpaceId(spaceId);
  }

  async findHost(id: string) {
    return await this.hostRepository.findHost(id);
  }

  async findHostDetail(id: string) {
    return await this.hostRepository.findHostDetail(id);
  }

  async findHostAccount(id: string) {
    return await this.hostRepository.findHostAccount(id);
  }

  async findHostAccountByHostId(hostId: string) {
    return await this.hostRepository.findHostAccountByHostId(hostId);
  }
  async checkHost(data: CheckHostDTO) {
    const host = await this.hostRepository.findHostByEmail(data.email);

    if (host.phoneNumber !== data.phoneNumber) {
      throw new HostException(HOST_ERROR_CODE.HOST_PHONE_NUMBER_BAD_REQUEST);
    }

    return new IsHostCheckedDTO({ isChecked: true });
  }

  async checkHostWithEmail(data: IsHostExistsQuery) {
    const host = await this.hostRepository.checkHostByEmail(data.email);

    return new IsHostExistsDTO({ isExists: Boolean(host) });
  }

  async updateHostPassword(data: UpdateHostPasswordDTO) {
    const host = await this.hostRepository.findHostByEmail(data.email);

    if (host.phoneNumber !== data.phoneNumber) {
      throw new HostException(HOST_ERROR_CODE.HOST_PHONE_NUMBER_BAD_REQUEST);
    }
    const newPassword = nanoid(10).toUpperCase();
    const password = this.encrypt.hashPassword(host.salt, newPassword);

    await this.hostRepository.updateHost(host.id, {
      password,
    });
    return new NewPasswordDTO({ newPassword });
  }

  async updateHost(id: string, data: UpdateHostDTO) {
    await this.findHost(id);
    await this.hostRepository.updateHost(id, data);
  }

  async deleteHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.deleteHost(id);
  }

  async hardDeleteHost(id: string) {
    await this.findHost(id);
    await this.hostRepository.hardDeleteHost(id);
  }

  async createHostAccount(hostId: string, data: CreateHostAccountDTO) {
    await this.findHostAccountByHostId(hostId);

    return await this.hostRepository.createHostAccount(hostId, data);
  }

  async updateHostAccountByHostId(hostId: string, data: UpdateHostAccountDTO) {
    const account = await this.findHostAccountByHostId(hostId);
    await this.hostRepository.updateHostAccount(account.id, data);
  }

  async deleteHostAccountByHostId(hostId: string) {
    const account = await this.findHostAccountByHostId(hostId);
    await this.hostRepository.deleteHostAccount(account.id);
  }
}
