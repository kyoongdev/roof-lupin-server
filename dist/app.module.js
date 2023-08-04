"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const modules_1 = require("./modules");
const utils_1 = require("./utils");
const app_controller_1 = require("./app.controller");
const event_1 = require("./event");
const fcm_1 = require("./event/fcm");
const scheduler_1 = require("./event/scheduler");
const admin_module_1 = require("./modules/admin/admin.module");
const global_1 = require("./modules/global");
const host_module_1 = require("./modules/host/host.module");
const aop_1 = require("./utils/aop");
const fcm_2 = require("./utils/fcm");
const link_1 = require("./utils/link");
const providers = [
    ...utils_1.Filters,
    ...utils_1.Interceptors,
    ...event_1.EventProviders,
    core_1.DiscoveryService,
    core_1.MetadataScanner,
    aop_1.AOPProvider,
    fcm_2.FCMProvider,
    scheduler_1.SchedulerEvent,
    fcm_1.FCMEvent,
    link_1.DynamicLinkProvider,
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            global_1.GlobalModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            event_emitter_1.EventEmitterModule.forRoot({
                global: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            modules_1.V1Module,
            admin_module_1.AdminModule,
            host_module_1.HostModule,
            core_1.RouterModule.register([
                {
                    path: '/api/v1',
                    module: modules_1.V1Module,
                    children: [...modules_1.Modules, { path: '/admins', module: admin_module_1.AdminModule }, { path: '/hosts', module: host_module_1.HostModule }],
                },
            ]),
        ],
        controllers: [app_controller_1.AppController],
        providers,
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map