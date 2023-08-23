import { Prisma } from '@prisma/client';

import { AdminFindSpacesQuery } from '@/modules/admin/dto/query/space';

import { BaseSQLInterface } from '../base-sql.interface';

import { BaseSpaceSQL, BaseSpaceSQLProps } from './base-space.sql';

interface AdminSpaceSQLProps extends Omit<BaseSpaceSQLProps, 'query'> {
  query: AdminFindSpacesQuery;
}

export class AdminSpaceSQL extends BaseSpaceSQL implements BaseSQLInterface {
  query: AdminFindSpacesQuery;

  constructor(props: AdminSpaceSQLProps) {
    super(props);
    this.query = props.query;
  }

  getSQLQuery(): Prisma.Sql {
    return Prisma.sql`
    SELECT ${this.getBaseSelect()}
    FROM Space sp
    ${this.getBaseJoin()}
    ${this.getWhere()}
    GROUP BY sp.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page}, ${this.paging.limit}
    `;
  }

  getWhere(): Prisma.Sql {
    const titleWhere = this.query.title
      ? Prisma.sql`AND sp.title LIKE '%${Prisma.raw(this.query.title)}%'`
      : Prisma.empty;
    const isApprovedWhere = this.query.isApproved
      ? Prisma.sql`AND sp.isApproved = ${this.query.isApproved}`
      : Prisma.empty;
    const isPublicWhere = this.query.isPublic ? Prisma.sql`AND sp.isPublic = ${this.query.isPublic}` : Prisma.empty;
    const hostIdWhere = this.query.hostId ? Prisma.sql`AND sp.hostId = ${this.query.hostId}` : Prisma.empty;

    return Prisma.sql`WHERE 1 = 1
                  ${titleWhere}
                  ${isApprovedWhere}
                  ${isPublicWhere}
                  ${hostIdWhere}
                `;
  }

  getOrderBy() {
    let orderBy: Prisma.Sql = Prisma.sql`ORDER BY sp.createdAt DESC`;

    if (this.query.sort === 'AVERAGE_RATING_HIGH') {
      orderBy = Prisma.sql`ORDER BY averageScore DESC`;
    } else if (this.query.sort === 'AVERAGE_RATING_LOW') {
      orderBy = Prisma.sql`ORDER BY averageScore ASC`;
    } else if (this.query.sort === 'PRICE_HIGH') {
      orderBy = Prisma.sql`ORDER BY baseCost DESC`;
    } else if (this.query.sort === 'PRICE_LOW') {
      orderBy = Prisma.sql`ORDER BY baseCost ASC`;
    } else if (this.query.sort === 'RECENT') {
      orderBy = Prisma.sql`ORDER BY sp.createdAt DESC`;
    } else if (this.query.sort === 'REVIEW_COUNT_HIGH') {
      orderBy = Prisma.sql`ORDER BY reviewCount DESC`;
    } else if (this.query.sort === 'REVIEW_COUNT_LOW') {
      orderBy = Prisma.sql`ORDER BY reviewCount ASC`;
    }
    return orderBy;
  }
}
