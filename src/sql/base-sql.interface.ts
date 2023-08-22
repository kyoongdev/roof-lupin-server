import { Prisma } from '@prisma/client';

export interface BaseSQLInterface {
  getSQLQuery(): Prisma.Sql;
}
