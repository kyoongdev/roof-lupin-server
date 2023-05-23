import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly database: PrismaService) {}
}
