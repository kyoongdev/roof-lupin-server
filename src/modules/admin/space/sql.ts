import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';

import { BASE_SPACE_JOIN, BASE_SPACE_SELECT } from '@/modules/space/sql';

import { AdminFindSpacesQuery } from '../dto/query/space';

export const getAdminFindSpacesSQL = (query: AdminFindSpacesQuery, paging: PagingDTO, where: Prisma.Sql) => {
  let orderBy: Prisma.Sql = Prisma.sql`ORDER BY sp.createdAt DESC`;

  if (query.sort === 'AVERAGE_RATING_HIGH') {
    orderBy = Prisma.sql`ORDER BY averageScore DESC`;
  } else if (query.sort === 'AVERAGE_RATING_LOW') {
    orderBy = Prisma.sql`ORDER BY averageScore ASC`;
  } else if (query.sort === 'PRICE_HIGH') {
    orderBy = Prisma.sql`ORDER BY baseCost DESC`;
  } else if (query.sort === 'PRICE_LOW') {
    orderBy = Prisma.sql`ORDER BY baseCost ASC`;
  } else if (query.sort === 'RECENT') {
    orderBy = Prisma.sql`ORDER BY sp.createdAt DESC`;
  } else if (query.sort === 'REVIEW_COUNT_HIGH') {
    orderBy = Prisma.sql`ORDER BY reviewCount DESC`;
  } else if (query.sort === 'REVIEW_COUNT_LOW') {
    orderBy = Prisma.sql`ORDER BY reviewCount ASC`;
  }

  return Prisma.sql`
  SELECT ${BASE_SPACE_SELECT()}
  FROM Space sp
  ${BASE_SPACE_JOIN}
  ${where}
  GROUP BY sp.id
  ${orderBy}
  LIMIT ${paging.page}, ${paging.limit}
  `;
};

export const getAdminCountSpacesSQL = (where: Prisma.Sql) => Prisma.sql`
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
