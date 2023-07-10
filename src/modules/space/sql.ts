import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { LatLngDTO } from '../location/dto';

import { FindSpacesQuery } from './dto/query';

const BASE_SELECT = Prisma.sql`
  sp.id as id, sp.title as title, sp.description as description, sp.buildingType as buildingType, sp.thumbnail as thumbnail, 
  sp.minUser as minUser , sp.maxUser as maxUser , sp.overflowUserCost as overflowUserCost, sp.overflowUserCount as overflowUserCount,
  sp.minCost as minCost , sp.minSize  as minSize, sp.isImmediateReservation as isImmediateReservation, sp.createdAt as createdAt, 
  sp.updatedAt as updatedAt, sp.deletedAt as deletedAt, sp.isApproved as isApproved, sp.isPublic as isPublic,
  sp.startAt as startAt, sp.endAt as endAt,
  sl.id as slId, sl.lat as lat, sl.lng as lng, sl.roadAddress as roadAddress, sl.jibunAddress as jibunAddress,
  COUNT(sr.id) as reviewCount , AVG(sr.score) as averageScore, COUNT(si.spaceId) as userInterests, COUNT(sr.spaceId) as reviewCount
`;

const BASE_JOIN = Prisma.sql`
  LEFT JOIN SpaceInterest si ON  sp.id = si.spaceId 
  LEFT JOIN SpaceReview sr ON sp.id = sr.spaceId
  INNER JOIN SpaceLocation sl ON sp.id = sl.spaceId
  INNER JOIN SpaceCategory sc ON sp.id = sc.spaceId
  INNER JOIN Category ca ON sc.categoryId = ca.id 
`;

export const getFindSpacesWithPopularitySQL = (paging: PagingDTO, where: Prisma.Sql) => Prisma.sql`
  SELECT ${BASE_SELECT}
  FROM Space sp
  ${BASE_JOIN}
  ${where}
  GROUP BY sp.id
  ORDER BY userInterests, averageScore, reviewCount
  LIMIT ${paging.page},${paging.limit ?? 10}
`;

export const getFindSpacesWithDistanceSQL = (location: LatLngDTO, paging: PagingDTO, where: Prisma.Sql) => Prisma.sql`
  SELECT ${BASE_SELECT}, (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
    -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) as distance

  FROM Space sp
  ${BASE_JOIN}
  ${where} AND  (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
  -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) <= ${location.distance / 1000}
  GROUP BY sp.id
  ORDER BY distance 
  LIMIT ${paging.page},${paging.limit ?? 10}
`;

export const getFindSpacesSQL = (query: FindSpacesQuery, paging: PagingDTO, where: Prisma.Sql) => {
  const orderBy =
    query.sort === 'PRICE_HIGH'
      ? Prisma.sql`sp.minCost DESC`
      : query.sort === 'PRICE_LOW'
      ? Prisma.sql`sp.minCost ASC`
      : Prisma.sql`sp.createdAt DESC`;

  return Prisma.sql`
  SELECT ${BASE_SELECT}
  FROM Space sp
  ${BASE_JOIN}
  ${where}
  GROUP BY sp.id
  ORDER BY ${orderBy}
  LIMIT ${paging.page},${paging.limit ?? 10}
`;
};

export const getCountSpacesSQL = (where: Prisma.Sql) => Prisma.sql`
SELECT *
FROM  
(
  SELECT sp.id 
  FROM Space sp
  ${BASE_JOIN}
  ${where}
  GROUP BY sp.id
) as sub  
`;
