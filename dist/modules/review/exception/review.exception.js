"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewException = void 0;
const common_1 = require("@nestjs/common");
class ReviewException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.ReviewException = ReviewException;
//# sourceMappingURL=review.exception.js.map