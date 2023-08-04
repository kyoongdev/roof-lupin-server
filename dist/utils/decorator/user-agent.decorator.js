"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
const common_1 = require("@nestjs/common");
exports.UserAgent = (0, common_1.createParamDecorator)(async (_, ctx) => {
    const request = await ctx.switchToHttp().getRequest();
    return request.headers['user-agent'];
});
//# sourceMappingURL=user-agent.decorator.js.map