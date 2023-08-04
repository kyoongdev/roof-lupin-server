import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
import { AdminFindSpacesQuery } from '../dto/query/space';
export declare const getAdminFindSpacesSQL: (query: AdminFindSpacesQuery, paging: PagingDTO, where: Prisma.Sql) => Prisma.Sql;
export declare const getAdminCountSpacesSQL: (where: Prisma.Sql) => Prisma.Sql;
