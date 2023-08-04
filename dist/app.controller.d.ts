import type { Response as ResponseType } from 'express';
import { PrismaService } from './database/prisma.service';
export declare class AppController {
  private readonly database;
  private kakaoBizUrl;
  constructor(database: PrismaService);
  healthCheck(response: ResponseType): void;
  seed(): Promise<void>;
  redirectSwagger(response: ResponseType): void;
  test(): {
    asdf: string;
  };
  test2(): Promise<{
    asdf: string;
  }>;
}
