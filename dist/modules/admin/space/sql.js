"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminCountSpacesSQL = exports.getAdminFindSpacesSQL = void 0;
const client_1 = require("@prisma/client");
const sql_1 = require("../../space/sql");
const getAdminFindSpacesSQL = (query, paging, where) => {
    let orderBy = client_1.Prisma.sql `ORDER BY sp.createdAt DESC`;
    if (query.sort === 'AVERAGE_RATING_HIGH') {
        orderBy = client_1.Prisma.sql `ORDER BY averageScore DESC`;
    }
    else if (query.sort === 'AVERAGE_RATING_LOW') {
        orderBy = client_1.Prisma.sql `ORDER BY averageScore ASC`;
    }
    else if (query.sort === 'PRICE_HIGH') {
        orderBy = client_1.Prisma.sql `ORDER BY baseCost DESC`;
    }
    else if (query.sort === 'PRICE_LOW') {
        orderBy = client_1.Prisma.sql `ORDER BY baseCost ASC`;
    }
    else if (query.sort === 'RECENT') {
        orderBy = client_1.Prisma.sql `ORDER BY sp.createdAt DESC`;
    }
    else if (query.sort === 'REVIEW_COUNT_HIGH') {
        orderBy = client_1.Prisma.sql `ORDER BY reviewCount DESC`;
    }
    else if (query.sort === 'REVIEW_COUNT_LOW') {
        orderBy = client_1.Prisma.sql `ORDER BY reviewCount ASC`;
    }
    return client_1.Prisma.sql `
  SELECT ${sql_1.BASE_SPACE_SELECT}
  FROM Space sp
  ${sql_1.BASE_SPACE_JOIN}
  ${where}
  GROUP BY sp.id
  ${orderBy}
  LIMIT ${paging.page}, ${paging.limit}
  `;
};
exports.getAdminFindSpacesSQL = getAdminFindSpacesSQL;
const getAdminCountSpacesSQL = (where) => client_1.Prisma.sql `
  SELECT id
  FROM  
  (
    SELECT sp.id 
    FROM Space sp
    ${sql_1.BASE_SPACE_JOIN}
    ${where} 
    GROUP BY sp.id
  ) as sub  
`;
exports.getAdminCountSpacesSQL = getAdminCountSpacesSQL;
//# sourceMappingURL=sql.js.map