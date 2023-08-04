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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const encrypt_1 = require("../../common/encrypt");
const admin_repository_1 = require("./admin.repository");
const dto_1 = require("./dto");
let AdminService = class AdminService {
    constructor(adminRepository, encrypt) {
        this.adminRepository = adminRepository;
        this.encrypt = encrypt;
    }
    async findAdmin(id) {
        return await this.adminRepository.findAdmin(id);
    }
    async findPagingAdmins(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.adminRepository.countAdmins({
            where: args.where,
        });
        const admins = await this.adminRepository.findAdmins({
            where: {
                ...args.where,
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(admins, { paging, count });
    }
    async checkAdminWithUserId(data) {
        const isChecked = await this.adminRepository.checkAdminByUserId(data.userId);
        return new dto_1.IsAdminCheckedDTO({ isChecked: Boolean(isChecked) });
    }
    async createAdmin(data, byAdmin = false) {
        return await this.adminRepository.createAdmin(data, byAdmin);
    }
    async updateAdminPassword(data) {
        const admin = await this.adminRepository.findAdminByUserId(data.userId);
        const password = this.encrypt.hashPassword(admin.salt, data.password);
        await this.adminRepository.updateAdmin(admin.id, { password });
    }
    async updateAdmin(id, data) {
        await this.findAdmin(id);
        await this.adminRepository.updateAdmin(id, data);
    }
    async deleteAdmin(id) {
        await this.findAdmin(id);
        await this.adminRepository.deleteAdmin(id);
    }
    async hardDeleteAdmin(id) {
        await this.findAdmin(id);
        await this.adminRepository.hardDeleteAdmin(id);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository, encrypt_1.EncryptProvider])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map