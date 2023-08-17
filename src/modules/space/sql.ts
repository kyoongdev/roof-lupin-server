import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';

import { LatLngDTO } from '../location/dto';

import { FindSpacesQuery } from './dto/query';

export const BASE_SPACE_SELECT = (userId?: string) => {
  const userIdSelect = userId
    ? Prisma.sql`,EXISTS(SELECT * FROM SpaceInterest WHERE SpaceInterest.userId = ${userId} AND sp.id = SpaceInterest.spaceId) AS isInterest`
    : Prisma.empty;

  return Prisma.sql`
  SQL_CALC_FOUND_ROWS
  sp.id as id, sp.title as title, sp.description as description, sp.buildingType as buildingType, sp.thumbnail as thumbnail, 
  sp.minUser as minUser , sp.maxUser as maxUser , sp.overflowUserCost as overflowUserCost, sp.overflowUserCount as overflowUserCount,
  sp.minSize  as minSize, sp.isImmediateReservation as isImmediateReservation, sp.createdAt as createdAt, 
  sp.updatedAt as updatedAt, sp.deletedAt as deletedAt, sp.isApproved as isApproved, sp.isPublic as isPublic, sp.orderNo as orderNo,
  sl.id as slId, sl.lat as lat, sl.lng as lng, sl.roadAddress as roadAddress, sl.jibunAddress as jibunAddress,
  COUNT(sr.id) as reviewCount , AVG(sr.score) as averageScore, COUNT(DISTINCT si.spaceId, si.userId) as interestCount, COUNT(sr.spaceId) as reviewCount,
  min(rt.baseCost) as baseCost,  sp.hostId as hostId ${userIdSelect}
`;
};

export const BASE_SPACE_JOIN = Prisma.sql`
  LEFT JOIN SpaceInterest si ON  sp.id = si.spaceId 
  LEFT JOIN SpaceReview sr ON sp.id = sr.spaceId
  LEFT JOIN PublicTransportation pt ON sp.id = pt.spaceId
  LEFT JOIN SpaceLocation sl ON sp.id = sl.spaceId
  LEFT JOIN SpaceCategory sc ON sp.id = sc.spaceId
  LEFT JOIN Category ca ON sc.categoryId = ca.id 
  LEFT JOIN SpaceHashTag sh ON sp.id = sh.spaceId
  LEFT JOIN HashTag ht ON sh.hashTagId = ht.id
  LEFT JOIN RentalType rt ON sp.id = rt.spaceId
  
  `;
// LEFT JOIN SpaceReport srp ON sp.id = srp.spaceId

export const getFindSpacesWithPopularitySQL = (paging: PagingDTO, where: Prisma.Sql, userId?: string) => Prisma.sql`
  SELECT ${BASE_SPACE_SELECT(userId)}
  FROM Space sp
  ${BASE_SPACE_JOIN}
  ${where}
  GROUP BY sp.id
  ORDER BY sp.orderNo DESC, interestCount DESC, averageScore DESC, reviewCount DESC
  LIMIT ${paging.page},${paging.limit ?? 10}
`;

export const getFindSpacesWithDistanceSQL = (
  location: LatLngDTO,
  paging: PagingDTO,
  where: Prisma.Sql,
  userId?: string
) => Prisma.sql`
  SELECT ${BASE_SPACE_SELECT(userId)}, (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
    -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) as distance
  FROM Space sp
  ${BASE_SPACE_JOIN}
  ${where} AND  (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
  -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) <= ${location.distance / 1000}
  GROUP BY sp.id
  ORDER BY sp.orderNo, distance 
  LIMIT ${paging.page},${paging.limit ?? 10}
`;

export const getFindSpacesSQL = (query: FindSpacesQuery, paging: PagingDTO, where: Prisma.Sql, userId?: string) => {
  const orderBy =
    query.sort === 'PRICE_HIGH'
      ? Prisma.sql`baseCost DESC`
      : query.sort === 'PRICE_LOW'
      ? Prisma.sql`baseCost ASC`
      : Prisma.sql`sp.createdAt DESC`;

  return Prisma.sql`
  SELECT ${BASE_SPACE_SELECT(userId)}
  FROM Space sp
  ${BASE_SPACE_JOIN}
  ${where}
  GROUP BY sp.id
  ORDER BY sp.orderNo, ${orderBy}
  LIMIT ${paging.page},${paging.limit ?? 10}
`;
};

export const getCountDistanceSpacesSQL = (location: LatLngDTO, where: Prisma.Sql) => Prisma.sql`
  SELECT id
  FROM
  (
    SELECT sp.id
    FROM Space sp
    ${BASE_SPACE_JOIN}
    ${where} AND  (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
    -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) <= ${location.distance / 1000}
    GROUP BY sp.id
  ) as sub
`;

export const getCountSpacesSQL = (where: Prisma.Sql) => Prisma.sql`
  SELECT id
  FROM  
  (
    SELECT sp.id 
    FROM Space sp
    ${BASE_SPACE_JOIN}
    ${where} 
    GROUP BY sp.id
  ) as sub  
`;
