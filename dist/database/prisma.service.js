"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const minimatch_1 = require("minimatch");
const log_1 = require("../log");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor(configService) {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
        });
        this.configService = configService;
        this.slaveDatabase = this.configService.get('NODE_ENV') !== 'stage' &&
            new client_1.PrismaClient({
                datasources: {
                    db: {
                        url: this.configService.get('SLAVE_DATABASE_URL'),
                    },
                },
            });
        this.logger = new common_1.Logger();
        this.configService.get('NODE_ENV') !== 'stage' && this.routeDatabase();
        this.softDeleteInterceptors();
    }
    async onModuleInit() {
        try {
            await this.$connect();
            this.configService.get('NODE_ENV') !== 'stage' && (await this.slaveDatabase.$connect());
            this.$on('query', (event) => {
                this.logger.log('Query: ' + event.query);
                this.logger.log('Duration: ' + event.duration + 'ms');
            });
        }
        catch (err) {
            log_1.logger.error(err);
        }
    }
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
    async routeDatabase() {
        this.$use(async (params, next) => {
            if ((0, minimatch_1.minimatch)(params.action, '+(find*|count|aggregate)')) {
                const res = await this.slaveDatabase[params.model][params.action](params.args);
                return res;
            }
            else if ((0, minimatch_1.minimatch)(params.action, '+(query*)')) {
                const res = await this.slaveDatabase.$queryRaw(params.args[0]);
                return res.map((responseItem) => {
                    const result = {};
                    for (const [key, value] of Object.entries(responseItem)) {
                        result[key] = {
                            prisma__type: typeof value,
                            prisma__value: value,
                        };
                    }
                    return result;
                });
            }
            else {
                const res = await next(params);
                return res;
            }
        });
    }
    async softDeleteInterceptors() {
        this.$use(async (params, next) => {
            const models = this.configService.get('SOFT_DELETE_MODELS')?.split(',') || [];
            models.forEach((model) => {
                if (params.model === model) {
                    if (params.action === 'delete') {
                        params.action = 'update';
                        params.args['data'] = { deletedAt: new Date() };
                    }
                    if (params.action === 'deleteMany') {
                        params.action = 'updateMany';
                        if (params.args.data != undefined) {
                            params.args.data = { deletedAt: new Date() };
                        }
                        else {
                            params.args['data'] = { deletedAt: new Date() };
                        }
                    }
                }
            });
            return next(params);
        });
    }
};
PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PrismaService);
exports.PrismaService = PrismaService;
//# sourceMappingURL=prisma.service.js.map