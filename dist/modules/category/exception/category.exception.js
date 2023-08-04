"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryException = void 0;
const common_1 = require("@nestjs/common");
class CategoryException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.CategoryException = CategoryException;
//# sourceMappingURL=category.exception.js.map