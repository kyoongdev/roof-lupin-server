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
exports.AdminSpaceService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const space_repository_1 = require("../../space/space.repository");
const space_1 = require("../dto/space");
const sql_1 = require("./sql");
let AdminSpaceService = class AdminSpaceService {
    constructor(spaceRepository) {
        this.spaceRepository = spaceRepository;
    }
    async findSpace(id) {
        return await this.spaceRepository.findSpace(id);
    }
    async findSpaceIds() {
        return await this.spaceRepository.findSpaceIds();
    }
    async countSpaces() {
        const count = await this.spaceRepository.countSpaces();
        return new space_1.SpaceCountDTO({ count });
    }
    async findPagingSpaces(paging, query) {
        let where = client_1.Prisma.empty;
        if (query.title) {
            where = client_1.Prisma.sql `WHERE sp.title LIKE ${query.title}`;
        }
        else if (query.isApproved) {
            where = client_1.Prisma.sql `WHERE sp.isApproved = ${query.isApproved}`;
        }
        else if (query.isPublic) {
            where = client_1.Prisma.sql `WHERE sp.isPublic = ${query.isPublic}`;
        }
        const sqlPaging = paging.getSqlPaging();
        const countSql = (0, sql_1.getAdminCountSpacesSQL)(where);
        const findSql = (0, sql_1.getAdminFindSpacesSQL)(query, sqlPaging, where);
        const count = await this.spaceRepository.countSpacesWithSQL(countSql);
        const spaces = await this.spaceRepository.findSpacesWithSQL(findSql);
        return new cumuco_nestjs_1.PaginationDTO(spaces, { count, paging });
    }
    async updateSpace(id, data) {
        await this.findSpace(id);
        await this.spaceRepository.updateSpace(id, data);
    }
    async updateSpaceOrder(id, data) {
        await this.findSpace(id);
        await this.spaceRepository.updateSpaceOrder(id, data.orderNo);
    }
    async deleteSpaceOrder(id) {
        await this.findSpace(id);
        await this.spaceRepository.deleteSpaceOrder(id);
    }
    async deleteSpace(id) {
        await this.findSpace(id);
        await this.spaceRepository.deleteSpace(id);
    }
};
AdminSpaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [space_repository_1.SpaceRepository])
], AdminSpaceService);
exports.AdminSpaceService = AdminSpaceService;
//# sourceMappingURL=space.service.js.map