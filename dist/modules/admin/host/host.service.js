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
exports.AdminHostService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const host_repository_1 = require("../../host/host.repository");
let AdminHostService = class AdminHostService {
    constructor(hostRepository) {
        this.hostRepository = hostRepository;
    }
    async findPagingHosts(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.hostRepository.countHosts({
            where: args.where,
        });
        const hosts = await this.hostRepository.findHosts({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(hosts, { count, paging });
    }
    async findHost(id) {
        return await this.hostRepository.findHostDetail(id);
    }
};
AdminHostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [host_repository_1.HostRepository])
], AdminHostService);
exports.AdminHostService = AdminHostService;
//# sourceMappingURL=host.service.js.map