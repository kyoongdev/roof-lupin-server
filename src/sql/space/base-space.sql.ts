import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';

export interface BaseSpaceSQLProps {
  userId?: string;
  isHoliday: boolean;
  paging: PagingDTO;
}

export class BaseSpaceSQL {
  userId?: string;
  paging: PagingDTO;
  isHoliday: boolean;

  constructor(props: BaseSpaceSQLProps) {
    this.userId = props.userId;
    this.isHoliday = props.isHoliday;
    this.paging = props.paging;
  }

  getBaseJoin() {
    return Prisma.sql`
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
  }

  getBaseSelect = () => {
    const userIdSelect = this.userId
      ? Prisma.sql`,EXISTS(SELECT * FROM SpaceInterest WHERE SpaceInterest.userId = ${this.userId} AND sp.id = SpaceInterest.spaceId) AS isInterest`
      : Prisma.empty;

    return Prisma.sql`
    SQL_CALC_FOUND_ROWS
    sp.id as id, sp.title as title, sp.description as description, sp.buildingType as buildingType, sp.thumbnail as thumbnail, 
    sp.maxUser as maxUser , sp.overflowUserCost as overflowUserCost, sp.overflowUserCount as overflowUserCount,
    sp.minSize  as minSize, sp.isImmediateReservation as isImmediateReservation, sp.isRoofOnly as isRoofOnly, sp.createdAt as createdAt, 
    sp.updatedAt as updatedAt, sp.deletedAt as deletedAt, sp.isApproved as isApproved, sp.isPublic as isPublic, sp.orderNo as orderNo,
    sl.id as slId, sl.lat as lat, sl.lng as lng, sl.roadAddress as roadAddress, sl.jibunAddress as jibunAddress,sl.detailAddress as detailAddress,
    COUNT(sr.id) as reviewCount , AVG(sr.score) as averageScore, COUNT(DISTINCT si.spaceId, si.userId) as interestCount, COUNT(sr.spaceId) as reviewCount,
    min(rt.baseCost) as baseCost,  sp.hostId as hostId ${userIdSelect}
  `;
  };
}
