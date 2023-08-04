"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const appConfig_1 = __importDefault(require("./appConfig"));
const log_1 = require("./log");
const app_module_1 = require("./app.module");
(async function () {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: log_1.logger,
    });
    await new appConfig_1.default(app)
        .enableCors({
        origin: '*',
    })
        .configureMiddleware()
        .configureInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)))
        .configurePipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
    }))
        .init();
})();
//# sourceMappingURL=main.js.map