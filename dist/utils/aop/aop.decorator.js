"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOP = exports.AOP_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.AOP_KEY = Symbol('AOP_KEY');
const AOP = (metadataKey) => (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.AOP_KEY, metadataKey), common_1.Injectable);
exports.AOP = AOP;
//# sourceMappingURL=aop.decorator.js.map