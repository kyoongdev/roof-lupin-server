"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementException = void 0;
const common_1 = require("@nestjs/common");
class AnnouncementException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.AnnouncementException = AnnouncementException;
//# sourceMappingURL=announcement.exception.js.map