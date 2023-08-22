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
    let where: Prisma.Sql = Prisma.empty;

    if (this.query.title) {
      where = Prisma.sql`WHERE sp.title LIKE '%${Prisma.raw(this.query.title)}%'`;
    } else if (this.query.isApproved) {
      where = Prisma.sql`WHERE sp.isApproved = ${this.query.isApproved}`;
    } else if (this.query.isPublic) {
      where = Prisma.sql`WHERE sp.isPublic = ${this.query.isPublic}`;
    }
    return where;
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
