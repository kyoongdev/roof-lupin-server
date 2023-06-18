import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export interface AdminFindSettlementsQueryProps {
  hostName?: string;
  spaceTitle?: string;
}

export class AdminFindSettlementsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '호스트 이름' } })
  hostName?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } })
  spaceTitle?: string;

  static generateQuery(query: AdminFindSettlementsQueryProps): Prisma.SettlementFindManyArgs {
    return {
      where: {
        ...(query.hostName && {
          reservations: {
            some: {
              rentalType: {
                space: {
                  host: {
                    name: {
                      contains: query.hostName,
                    },
                  },
                },
              },
            },
          },
        }),
        ...(query.spaceTitle && {
          reservations: {
            some: {
              rentalType: {
                space: {
                  title: {
                    contains: query.spaceTitle,
                  },
                },
              },
            },
          },
        }),
      },
    };
  }
}
