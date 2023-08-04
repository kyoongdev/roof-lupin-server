"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingException = void 0;
const common_1 = require("@nestjs/common");
class RankingException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.RankingException = RankingException;
//# sourceMappingURL=ranking.exception.js.map