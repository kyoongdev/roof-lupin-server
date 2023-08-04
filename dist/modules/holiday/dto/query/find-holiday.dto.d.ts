import { Prisma } from '@prisma/client';
export declare class FindHolidayDTO {
    year: string;
    month: string;
    generateQuery(): Prisma.HolidayFindManyArgs;
}
