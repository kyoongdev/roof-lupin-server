import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TossPayProvider {
  constructor(private readonly configService: ConfigService) {}
}
