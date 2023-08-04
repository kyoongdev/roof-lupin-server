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
exports.AdminUserService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const errorCode_1 = require("../../user/exception/errorCode");
const user_exception_1 = require("../../user/exception/user.exception");
const user_repository_1 = require("./user.repository");
let AdminUserService = class AdminUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUser(id) {
        return await this.userRepository.findUser(id);
    }
    async findPagingUsers(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.userRepository.countUsers({
            where: args.where,
        });
        const users = await this.userRepository.findUsers({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(users, { count, paging });
    }
    async updateUser(id, props) {
        await this.findUser(id);
        await this.userRepository.updateUser(id, props);
    }
    async blockUser(id, data) {
        const user = await this.findUser(id);
        if (user.isBlocked) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.CONFLICT(errorCode_1.USER_ALREADY_BLOCKED));
        }
        await this.userRepository.updateUser(id, data);
    }
    async unBlockUser(id) {
        const user = await this.findUser(id);
        if (!user.isBlocked) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.CONFLICT(errorCode_1.USER_ALREADY_BLOCKED));
        }
        await this.userRepository.updateUser(id, {
            isBlocked: false,
            unBlockAt: null,
        });
    }
    async deleteUser(id) {
        await this.findUser(id);
        await this.userRepository.deleteUser(id);
    }
    async restoreUser(id) {
        await this.findUser(id);
        await this.userRepository.restoreUser(id);
    }
    async hardDeleteUser(id) {
        await this.findUser(id);
        await this.userRepository.hardDeleteUser(id);
    }
};
AdminUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.AdminUserRepository])
], AdminUserService);
exports.AdminUserService = AdminUserService;
//# sourceMappingURL=user.service.js.map