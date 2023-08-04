"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const node_schedule_1 = __importDefault(require("node-schedule"));
const prisma_service_1 = require("./database/prisma.service");
const fcm_1 = require("./utils/fcm");
class AppConfig {
    constructor(app) {
        this.app = app;
    }
    async init() {
        this.configureSwagger();
        await this.configureDatabase();
        await this.app.listen(8000, () => {
            console.info('🔥루프루팡 서버 시작!! 8000🔥');
        });
        await this.initAlarm();
    }
    async initAlarm() {
        const database = this.app.get(prisma_service_1.PrismaService);
        const fcmProvider = this.app.get(fcm_1.FCMProvider);
        const alarms = await database.userAlarm.findMany({
            where: {
                isPushed: false,
                isRead: false,
            },
            include: {
                user: true,
            },
        });
        await Promise.all(alarms.map(async (alarm) => {
            const currentDate = new Date();
            const alarmAt = alarm.alarmAt;
            if (currentDate >= alarmAt) {
                await fcmProvider.sendMessage({
                    token: alarm.user.pushToken,
                    title: alarm.title,
                    body: alarm.content,
                });
                await database.userAlarm.update({
                    where: {
                        id: alarm.id,
                    },
                    data: {
                        isPushed: true,
                    },
                });
            }
            else {
                node_schedule_1.default.scheduleJob(alarmAt, async () => {
                    await fcmProvider.sendMessage({
                        token: alarm.user.pushToken,
                        title: alarm.title,
                        body: alarm.content,
                    });
                    await database.userAlarm.update({
                        where: {
                            id: alarm.id,
                        },
                        data: {
                            isPushed: true,
                        },
                    });
                });
            }
        }));
    }
    enableCors(options) {
        this.app.enableCors(options);
        return this;
    }
    configureMiddleware(...middlewares) {
        middlewares.length > 0 && this.app.use(...middlewares);
        return this;
    }
    configurePipes(...pipes) {
        pipes.length > 0 && this.app.useGlobalPipes(...pipes);
        return this;
    }
    configureInterceptors(...interceptors) {
        interceptors.length > 0 && this.app.useGlobalInterceptors(...interceptors);
        return this;
    }
    configureSwagger() {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('🖕RoofLupin API🖕')
            .setDescription('RoofLupin 루프루팡의 API 문서입니다.')
            .setContact("RoofLupin's Developer", '', 'dev@cumuco.net')
            .setVersion('1.0.0')
            .addServer('http://localhost:8000')
            .addServer('https://api.rooflupin.com')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            name: 'JWT',
            in: 'header',
        }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(this.app, swaggerConfig);
        swagger_1.SwaggerModule.setup('api-docs', this.app, document);
    }
    async configureDatabase() {
        const config = this.app.get(config_1.ConfigService);
        const database = this.app.get(prisma_service_1.PrismaService);
        await database.enableShutdownHooks(this.app);
    }
}
exports.default = AppConfig;
//# sourceMappingURL=appConfig.js.map