import { Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Modules } from '@/modules';
import { Filters, Interceptors } from '@/utils';

import { AppController } from './app.controller';

const providers: Provider[] = [...Filters, ...Interceptors];

@Module({
  imports: [
    ...Modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
