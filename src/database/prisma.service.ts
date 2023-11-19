import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Prisma, PrismaClient } from '@prisma/client';
import { minimatch } from 'minimatch';

import { logger } from '@/log';

export type TransactionPrisma = Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private slaveDatabase = new PrismaClient({
    datasources: {
      db: {
        url: this.configService.get('SLAVE_DATABASE_URL'),
      },
    },
  });

  constructor(private readonly configService: ConfigService) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
    this.routeDatabase();
    this.softDeleteInterceptors();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.slaveDatabase.$connect();
      this.$on<any>('query', (event: Prisma.QueryEvent) => {
        // logger.log('Query: ' + event.query);
        // logger.log('Duration: ' + event.duration + 'ms');
      });
    } catch (err) {
      logger.error(err);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async routeDatabase() {
    this.$use(async (params, next) => {
      if (minimatch(params.action, '+(find*|count|aggregate)')) {
        const res = await this.slaveDatabase[params.model][params.action](params.args);

        return res;
      } else if (minimatch(params.action, '+(query*)')) {
        const res: any[] = await this.slaveDatabase.$queryRaw(params.args[0]);
        return res.map((responseItem) => {
          const result: Record<string, any> = {};
          for (const [key, value] of Object.entries(responseItem)) {
            result[key] = {
              prisma__type: typeof value,
              prisma__value: value,
            };
          }

          return result;
        });
      } else {
        const res = await next(params);

        return res;
      }
    });
  }

  async softDeleteInterceptors() {
    this.$use(async (params, next) => {
      const models = this.configService.get('SOFT_DELETE_MODELS')?.split(',') || [];
      models.forEach((model: string) => {
        if (params.model === model) {
          if (params.action === 'delete') {
            params.action = 'update';
            params.args['data'] = { deletedAt: new Date() };
          }
          if (params.action === 'deleteMany') {
            params.action = 'updateMany';
            if (params.args.data != undefined) {
              params.args.data = { deletedAt: new Date() };
            } else {
              params.args['data'] = { deletedAt: new Date() };
            }
          }
        }
      });

      return next(params);
    });
  }
}
