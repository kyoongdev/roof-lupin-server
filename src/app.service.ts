import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly database: PrismaService) {}
  async getHello() {
    const hosts = await this.database.host.findMany();
    return hosts;
  }
}
