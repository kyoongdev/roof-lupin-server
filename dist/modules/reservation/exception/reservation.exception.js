"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationException = void 0;
const common_1 = require("@nestjs/common");
class ReservationException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.ReservationException = ReservationException;
//# sourceMappingURL=reservation.exception.js.map