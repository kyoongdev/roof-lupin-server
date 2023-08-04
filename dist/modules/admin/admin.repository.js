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
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const encrypt_1 = require("../../common/encrypt");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const admin_exception_1 = require("./exception/admin.exception");
const errorCode_1 = require("./exception/errorCode");
let AdminRepository = class AdminRepository {
    constructor(database, encrypt) {
        this.database = database;
        this.encrypt = encrypt;
    }
    async findAdmins(args = {}) {
        const admins = await this.database.admin.findMany({
            ...args,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
        });
        return admins.map((admin) => new dto_1.AdminDTO(admin));
    }
    async countAdmins(args = {}) {
        return await this.database.admin.count(args);
    }
    async findAdmin(id) {
        const admin = await this.database.admin.findUnique({
            where: {
                id,
            },
        });
        if (!admin) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.NOT_FOUND(errorCode_1.ADMIN_NOT_FOUND));
        }
        return new dto_1.AdminDTO(admin);
    }
    async findAdminDetail(id) {
        const admin = await this.database.admin.findUnique({
            where: {
                id,
            },
        });
        if (!admin) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.NOT_FOUND(errorCode_1.ADMIN_NOT_FOUND));
        }
        return new dto_1.AdminDetailDTO(admin);
    }
    async findAdminByUserId(userId) {
        const admin = await this.database.admin.findFirst({
            where: {
                userId,
            },
        });
        if (!admin) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.NOT_FOUND(errorCode_1.ADMIN_NOT_FOUND));
        }
        return new dto_1.AdminDetailDTO(admin);
    }
    async checkAdminByUserId(userId) {
        const admin = await this.database.admin.findFirst({
            where: {
                userId,
            },
        });
        if (!admin) {
            return false;
        }
        return new dto_1.AdminDetailDTO(admin);
    }
    async createAdmin(data, byAdmin = false) {
        const salt = this.encrypt.createSalt();
        const admin = await this.database.admin.create({
            data: {
                ...data,
                password: this.encrypt.hashPassword(salt, data.password),
                salt,
                isAccepted: byAdmin,
            },
        });
        return admin.id;
    }
    async updateAdmin(id, data) {
        const updateArgs = data;
        if (data.password) {
            const salt = this.encrypt.createSalt();
            updateArgs.salt = salt;
            updateArgs.password = this.encrypt.hashPassword(salt, data.password);
        }
        await this.database.admin.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }
    async deleteAdmin(id) {
        await this.database.admin.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async hardDeleteAdmin(id) {
        await this.database.admin.delete({
            where: {
                id,
            },
        });
    }
};
AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, encrypt_1.EncryptProvider])
], AdminRepository);
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=admin.repository.js.map