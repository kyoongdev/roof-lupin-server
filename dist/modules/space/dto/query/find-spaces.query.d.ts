import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
import { SPACE_SORT_OPTION } from '../validation/space-sort.validation';
import { FindByDateQuery } from './find-by-date.query';
import { FindByLocationQuery } from './find-by-location.query';
export declare class FindSpacesQuery extends PagingDTO {
    keyword?: string;
    userCount?: number;
    category?: string;
    categoryIds?: string;
    lat?: string;
    lng?: string;
    distance?: number;
    locationName?: string;
    year?: string;
    month?: string;
    day?: string;
    startAt?: number;
    endAt?: number;
    sort?: keyof typeof SPACE_SORT_OPTION;
    findSpacesFindManyClause(userId?: string): Prisma.SpaceFindManyArgs;
    getFindByDateQuery(): FindByDateQuery;
    getFindByLocationQuery(): FindByLocationQuery | null;
    generateSqlWhereClause(excludeQueries: Prisma.Sql[], userId?: string): Prisma.Sql;
}
