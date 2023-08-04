"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const seed_1 = require("./seed");
(async () => {
    const database = new client_1.PrismaClient();
    await (0, seed_1.seedDatabase)(database);
})();
//# sourceMappingURL=seed-db.js.map