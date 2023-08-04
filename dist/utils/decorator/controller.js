"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const API_PREFIX = '/api/v1';
const ApiController = (path = '', tag) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, common_1.Controller)(path));
exports.ApiController = ApiController;
//# sourceMappingURL=controller.js.map