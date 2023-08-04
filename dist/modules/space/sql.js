"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountSpacesSQL = exports.getCountDistanceSpacesSQL = exports.getFindSpacesSQL = exports.getFindSpacesWithDistanceSQL = exports.getFindSpacesWithPopularitySQL = exports.BASE_SPACE_JOIN = exports.BASE_SPACE_SELECT = void 0;
const client_1 = require("@prisma/client");
exports.BASE_SPACE_SELECT = client_1.Prisma.sql `
  sp.id as id, sp.title as title, sp.description as description, sp.buildingType as buildingType, sp.thumbnail as thumbnail, 
  sp.minUser as minUser , sp.maxUser as maxUser , sp.overflowUserCost as overflowUserCost, sp.overflowUserCount as overflowUserCount,
  sp.minSize  as minSize, sp.isImmediateReservation as isImmediateReservation, sp.createdAt as createdAt, 
  sp.updatedAt as updatedAt, sp.deletedAt as deletedAt, sp.isApproved as isApproved, sp.isPublic as isPublic, sp.orderNo as orderNo,
  sl.id as slId, sl.lat as lat, sl.lng as lng, sl.roadAddress as roadAddress, sl.jibunAddress as jibunAddress,
  COUNT(sr.id) as reviewCount , AVG(sr.score) as averageScore, COUNT(DISTINCT si.spaceId, si.userId) as userInterests, COUNT(sr.spaceId) as reviewCount,
  min(rt.baseCost) as baseCost, COUNT(srp.id) as reportCount

`;
exports.BASE_SPACE_JOIN = client_1.Prisma.sql `
  LEFT JOIN SpaceInterest si ON  sp.id = si.spaceId 
  LEFT JOIN SpaceReview sr ON sp.id = sr.spaceId
  LEFT JOIN PublicTransportation pt ON sp.id = pt.spaceId
  LEFT JOIN SpaceLocation sl ON sp.id = sl.spaceId
  LEFT JOIN SpaceCategory sc ON sp.id = sc.spaceId
  LEFT JOIN Category ca ON sc.categoryId = ca.id 
  LEFT JOIN SpaceHashTag sh ON sp.id = sh.spaceId
  LEFT JOIN HashTag ht ON sh.hashTagId = ht.id
  LEFT JOIN RentalType rt ON sp.id = rt.spaceId
  LEFT JOIN SpaceReport srp ON sp.id = srp.spaceId
  
`;
const getFindSpacesWithPopularitySQL = (paging, where) => client_1.Prisma.sql `
  SELECT ${exports.BASE_SPACE_SELECT}
  FROM Space sp
  ${exports.BASE_SPACE_JOIN}
  ${where}
  GROUP BY sp.id
  ORDER BY sp.orderNo DESC, userInterests DESC, averageScore DESC, reviewCount DESC
  LIMIT ${paging.page},${paging.limit ?? 10}
`;
exports.getFindSpacesWithPopularitySQL = getFindSpacesWithPopularitySQL;
const getFindSpacesWithDistanceSQL = (location, paging, where) => client_1.Prisma.sql `
  SELECT ${exports.BASE_SPACE_SELECT}, (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
    -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) as distance
  FROM Space sp
  ${exports.BASE_SPACE_JOIN}
  ${where} AND  (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
  -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) <= ${location.distance / 1000}
  GROUP BY sp.id
  ORDER BY sp.orderNo, distance 
  LIMIT ${paging.page},${paging.limit ?? 10}
`;
exports.getFindSpacesWithDistanceSQL = getFindSpacesWithDistanceSQL;
const getFindSpacesSQL = (query, paging, where) => {
    const orderBy = query.sort === 'PRICE_HIGH'
        ? client_1.Prisma.sql `baseCost DESC`
        : query.sort === 'PRICE_LOW'
            ? client_1.Prisma.sql `baseCost ASC`
            : client_1.Prisma.sql `sp.createdAt DESC`;
    return client_1.Prisma.sql `
  SELECT ${exports.BASE_SPACE_SELECT}
  FROM Space sp
  ${exports.BASE_SPACE_JOIN}
  ${where}
  GROUP BY sp.id
  ORDER BY sp.orderNo, ${orderBy}
  LIMIT ${paging.page},${paging.limit ?? 10}
`;
};
exports.getFindSpacesSQL = getFindSpacesSQL;
const getCountDistanceSpacesSQL = (location, where) => client_1.Prisma.sql `
  SELECT *
  FROM
  (
    SELECT sp.id
    FROM Space sp
    ${exports.BASE_SPACE_JOIN}
    ${where} AND  (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
    -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) <= ${location.distance / 1000}
    GROUP BY sp.id
  ) as sub
`;
exports.getCountDistanceSpacesSQL = getCountDistanceSpacesSQL;
const getCountSpacesSQL = (where) => client_1.Prisma.sql `
  SELECT id
  FROM  
  (
    SELECT sp.id 
    FROM Space sp
    ${exports.BASE_SPACE_JOIN}
    ${where} 
    GROUP BY sp.id
  ) as sub  
`;
exports.getCountSpacesSQL = getCountSpacesSQL;
//# sourceMappingURL=sql.js.map