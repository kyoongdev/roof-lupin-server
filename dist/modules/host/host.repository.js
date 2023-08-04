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
exports.HostRepository = void 0;
const common_1 = require("@nestjs/common");
const encrypt_1 = require("../../common/encrypt");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const host_auth_detail_dto_1 = require("./dto/host-auth-detail.dto");
const host_detail_dto_1 = require("./dto/host-detail.dto");
const errorCode_1 = require("./exception/errorCode");
const host_exception_1 = require("./exception/host.exception");
let HostRepository = class HostRepository {
    constructor(database, encrypt) {
        this.database = database;
        this.encrypt = encrypt;
    }
    async findHostBySpaceId(spaceId) {
        const host = await this.database.host.findFirst({
            where: {
                spaces: {
                    some: {
                        id: spaceId,
                    },
                },
            },
        });
        if (!host) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_NOT_FOUND));
        }
        return new dto_1.HostDTO(host);
    }
    async findHosts(args = {}) {
        const hosts = await this.database.host.findMany({
            where: {
                ...args.where,
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip: args.skip,
            take: args.take,
        });
        return hosts.map((host) => new dto_1.HostDTO(host));
    }
    async countHosts(args = {}) {
        return this.database.host.count({
            where: args.where,
        });
    }
    async findHost(id) {
        const host = await this.database.host.findUnique({
            where: {
                id,
            },
        });
        if (!host) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_NOT_FOUND));
        }
        return new dto_1.HostDTO(host);
    }
    async findHostDetail(id) {
        const host = await this.database.host.findUnique({
            where: {
                id,
            },
            include: {
                hostAccount: true,
            },
        });
        if (!host) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_NOT_FOUND));
        }
        return new host_detail_dto_1.HostDetailDTO(host);
    }
    async checkHostByEmail(email) {
        const host = await this.database.host.findUnique({
            where: {
                email,
            },
        });
        if (!host) {
            return false;
        }
        return new dto_1.HostDTO(host);
    }
    async findHostByEmail(email) {
        const host = await this.database.host.findUnique({
            where: {
                email,
            },
        });
        if (!host) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_NOT_FOUND));
        }
        return new host_auth_detail_dto_1.HostAuthDetailDTO(host);
    }
    async createHost(data) {
        const salt = this.encrypt.createSalt();
        const password = this.encrypt.hashPassword(data.password, salt);
        const host = await this.database.host.create({
            data: {
                ...data,
                salt,
                password,
            },
        });
        return host.id;
    }
    async updateHost(id, data) {
        const updateArgs = data;
        if (data.password) {
            const salt = this.encrypt.createSalt();
            updateArgs.salt = salt;
            updateArgs.password = this.encrypt.hashPassword(data.password, salt);
        }
        await this.database.host.update({
            where: {
                id,
            },
            data: updateArgs,
        });
        return id;
    }
    async deleteHost(id) {
        await this.database.host.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async hardDeleteHost(id) {
        await this.database.host.delete({
            where: {
                id,
            },
        });
    }
    async findHostAccount(id) {
        const hostAccount = await this.database.hostAccount.findUnique({
            where: {
                id,
            },
        });
        if (!hostAccount) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_ACCOUNT_NOT_FOUND));
        }
        return new dto_1.HostAccountDTO(hostAccount);
    }
    async findHostAccountByHostId(hostId) {
        const hostAccount = await this.database.hostAccount.findUnique({
            where: {
                hostId,
            },
        });
        if (!hostAccount) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_ACCOUNT_NOT_FOUND));
        }
        return new dto_1.HostAccountDTO(hostAccount);
    }
    async createHostAccount(hostId, data) {
        const hostAccount = await this.database.hostAccount.create({
            data: {
                ...data,
                host: {
                    connect: {
                        id: hostId,
                    },
                },
            },
        });
        return hostAccount.id;
    }
    async updateHostAccount(id, data) {
        await this.database.hostAccount.update({
            where: {
                id,
            },
            data,
        });
        return id;
    }
    async updateHostAccountByHostId(hostId, data) {
        await this.database.hostAccount.update({
            where: {
                hostId,
            },
            data,
        });
    }
    async deleteHostAccount(id) {
        await this.database.hostAccount.delete({
            where: {
                id,
            },
        });
    }
};
HostRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, encrypt_1.EncryptProvider])
], HostRepository);
exports.HostRepository = HostRepository;
//# sourceMappingURL=host.repository.js.map