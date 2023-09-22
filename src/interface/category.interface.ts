import type { Prisma } from '@prisma/client';

export interface CategoryInclude {
  include: {
    category: {
      include: {
        icons: {
          include: {
            icon: true;
          };
        };
      };
    };
  };
  orderBy: Prisma.Enumerable<Prisma.SpaceCategoryOrderByWithRelationInput>;
}
