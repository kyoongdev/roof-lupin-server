"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceException = void 0;
const common_1 = require("@nestjs/common");
class SpaceException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.SpaceException = SpaceException;
//# sourceMappingURL=space.exception.js.map