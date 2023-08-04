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
exports.FindSpacesQuery = void 0;
const client_1 = require("@prisma/client");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const space_sort_validation_1 = require("../validation/space-sort.validation");
class FindSpacesQuery extends cumuco_nestjs_1.PagingDTO {
    findSpacesFindManyClause(userId) {
        return {
            where: {
                ...(this.keyword && {
                    OR: [
                        {
                            title: {
                                contains: this.keyword,
                            },
                        },
                        {
                            location: {
                                jibunAddress: {
                                    contains: this.keyword,
                                },
                                roadAddress: {
                                    contains: this.keyword,
                                },
                            },
                        },
                        {
                            publicTransportations: {
                                some: {
                                    name: {
                                        contains: this.keyword,
                                    },
                                },
                            },
                        },
                        {
                            hashTags: {
                                some: {
                                    hashTag: {
                                        name: {
                                            contains: this.keyword,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                }),
                ...(this.userCount && {
                    minUser: {
                        lte: this.userCount,
                    },
                }),
                ...(this.category && {
                    categories: {
                        some: {
                            category: {
                                name: {
                                    contains: this.category,
                                },
                            },
                        },
                    },
                }),
                ...(this.categoryIds && {
                    categories: {
                        some: {
                            OR: this.categoryIds.split(',').map((categoryId) => ({ categoryId })),
                        },
                    },
                }),
                ...(this.locationName && {
                    location: {
                        OR: [
                            {
                                jibunAddress: {
                                    contains: this.locationName,
                                },
                            },
                            {
                                roadAddress: {
                                    contains: this.locationName,
                                },
                            },
                        ],
                    },
                }),
                ...(userId && {
                    NOT: [
                        {
                            reports: {
                                some: {
                                    userId,
                                },
                            },
                        },
                    ],
                }),
            },
        };
    }
    getFindByDateQuery() {
        if (!this.year || !this.month || !this.day) {
            return null;
        }
        return {
            year: this.year,
            month: this.month,
            day: this.day,
            startAt: this.startAt,
            endAt: this.endAt,
        };
    }
    getFindByLocationQuery() {
        if (!this.lat || !this.lng || !this.distance) {
            return null;
        }
        return {
            lat: this.lat,
            lng: this.lng,
            distance: this.distance,
        };
    }
    generateSqlWhereClause(excludeQueries, userId) {
        const userCountWhere = this.userCount ? client_1.Prisma.sql `minUser <= ${this.userCount}` : client_1.Prisma.empty;
        const locationWhere = this.locationName
            ? client_1.Prisma.sql `AND (sl.jibunAddress LIKE '%${client_1.Prisma.raw(this.locationName)}%' OR sl.roadAddress LIKE '%${client_1.Prisma.raw(this.locationName)}%')`
            : client_1.Prisma.empty;
        const reportWhere = userId
            ? client_1.Prisma.sql `AND sp.id NOT IN (SELECT spaceId FROM SpaceReport as sre WHERE sre.userId = ${userId})`
            : client_1.Prisma.empty;
        const categoryWhere = this.category ? client_1.Prisma.sql `AND ca.name LIKE '%${client_1.Prisma.raw(this.category)}%'` : client_1.Prisma.empty;
        const categoryIdWhere = this.categoryIds
            ? client_1.Prisma.sql `AND ca.id IN (${client_1.Prisma.join(this.categoryIds.split(','), ',')})`
            : client_1.Prisma.empty;
        const keywordWhere = this.keyword
            ? client_1.Prisma.sql `
          AND (sp.title LIKE '%${client_1.Prisma.raw(this.keyword)}%'
          OR sl.jibunAddress LIKE '%${client_1.Prisma.raw(this.keyword)}%'
          OR sl.roadAddress LIKE '%${client_1.Prisma.raw(this.keyword)}%'
          OR pt.name LIKE '%${client_1.Prisma.raw(this.keyword)}%'
          OR ht.name LIKE '%${client_1.Prisma.raw(this.keyword)}%')`
            : client_1.Prisma.empty;
        const excludeIds = excludeQueries.length > 0
            ? client_1.Prisma.sql `${client_1.Prisma.join(excludeQueries.map((query) => client_1.Prisma.sql `AND sp.id NOT in (${query})`), '')}`
            : client_1.Prisma.empty;
        const where = client_1.Prisma.sql `WHERE sp.isPublic = 1 AND sp.isApproved = 1 ${userCountWhere} ${categoryWhere} ${categoryIdWhere} ${locationWhere} ${excludeIds} ${reportWhere} ${keywordWhere} `;
        return where;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '검색어' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "keyword", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '인원수 필터' } }),
    __metadata("design:type", Number)
], FindSpacesQuery.prototype, "userCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '카테고리 명' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "category", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '카테고리 id들 (,를 통해 구분합니다.)' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "categoryIds", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '위도' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "lat", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '경도' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "lng", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '거리 - 위도 경도 검색시 필수' } }),
    __metadata("design:type", Number)
], FindSpacesQuery.prototype, "distance", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '지역명', example: '강동구' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "locationName", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 연도' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 월' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 일' } }),
    __metadata("design:type", String)
], FindSpacesQuery.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 시작 시간' } }),
    __metadata("design:type", Number)
], FindSpacesQuery.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 종료 시간' } }),
    __metadata("design:type", Number)
], FindSpacesQuery.prototype, "endAt", void 0);
__decorate([
    (0, space_sort_validation_1.SpaceSortValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: space_sort_validation_1.SPACE_SORT_OPTION_VALUES } }),
    __metadata("design:type", Object)
], FindSpacesQuery.prototype, "sort", void 0);
exports.FindSpacesQuery = FindSpacesQuery;
//# sourceMappingURL=find-spaces.query.js.map