"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchException = void 0;
const common_1 = require("@nestjs/common");
class SearchException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.SearchException = SearchException;
//# sourceMappingURL=search.exception.js.map