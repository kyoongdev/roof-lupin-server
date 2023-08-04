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
exports.LocationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LocationRepository = class LocationRepository {
    constructor(database) {
        this.database = database;
    }
    async getLocationsByDistance(paging, query) {
        const locations = await this.database.$queryRaw `
    SELECT *,
	  (6371*acos(cos(radians(${query.lat}))*cos(radians(lat))*cos(radians(lng)
	  -radians(${query.lng}))+sin(radians(${query.lat}))*sin(radians(lat))))
	  AS distance
    FROM SpaceLocation
    HAVING distance <= ${query.distance}
    ORDER BY distance 
    LIMIT ${paging.page ?? 0},${paging.limit ?? 10}
    `;
        return locations;
    }
};
LocationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationRepository);
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location.repository.js.map