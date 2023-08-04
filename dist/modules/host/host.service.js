"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const encrypt_1 = require("../../common/encrypt");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const host_exception_1 = require("./exception/host.exception");
const host_repository_1 = require("./host.repository");
let HostService = class HostService {
    constructor(hostRepository, encrypt) {
        this.hostRepository = hostRepository;
        this.encrypt = encrypt;
    }
    async findHostBySpaceId(spaceId) {
        return await this.hostRepository.findHostBySpaceId(spaceId);
    }
    async findHost(id) {
        return await this.hostRepository.findHost(id);
    }
    async findHostDetail(id) {
        return await this.hostRepository.findHostDetail(id);
    }
    async findHostAccount(id) {
        return await this.hostRepository.findHostAccount(id);
    }
    async findHostAccountByHostId(hostId) {
        return await this.hostRepository.findHostAccountByHostId(hostId);
    }
    async checkHost(data) {
        const host = await this.hostRepository.findHostByEmail(data.email);
        if (host.phoneNumber !== data.phoneNumber) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.BAD_REQUEST(errorCode_1.HOST_PHONE_NUMBER_BAD_REQUEST));
        }
        return new dto_1.IsHostCheckedDTO({ isChecked: true });
    }
    async updateHostPassword(data) {
        const host = await this.hostRepository.findHostByEmail(data.email);
        if (host.phoneNumber !== data.phoneNumber) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.BAD_REQUEST(errorCode_1.HOST_PHONE_NUMBER_BAD_REQUEST));
        }
        const newPassword = (0, nanoid_1.nanoid)(10).toUpperCase();
        const password = this.encrypt.hashPassword(host.salt, newPassword);
        await this.hostRepository.updateHost(host.id, {
            password,
        });
        return new dto_1.NewPasswordDTO({ newPassword });
    }
    async updateHost(id, data) {
        await this.findHost(id);
        await this.hostRepository.updateHost(id, data);
    }
    async deleteHost(id) {
        await this.findHost(id);
        await this.hostRepository.deleteHost(id);
    }
    async hardDeleteHost(id) {
        await this.findHost(id);
        await this.hostRepository.hardDeleteHost(id);
    }
    async createHostAccount(hostId, data) {
        await this.findHostAccountByHostId(hostId);
        return await this.hostRepository.createHostAccount(hostId, data);
    }
    async updateHostAccountByHostId(hostId, data) {
        const account = await this.findHostAccountByHostId(hostId);
        await this.hostRepository.updateHostAccount(account.id, data);
    }
    async deleteHostAccountByHostId(hostId) {
        const account = await this.findHostAccountByHostId(hostId);
        await this.hostRepository.deleteHostAccount(account.id);
    }
};
HostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [host_repository_1.HostRepository, encrypt_1.EncryptProvider])
], HostService);
exports.HostService = HostService;
//# sourceMappingURL=host.service.js.map