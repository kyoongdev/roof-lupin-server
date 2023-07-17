import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NaverProvider {
  constructor(private readonly configService: ConfigService) {}

  //TODO: 네이버페이 결제 요청 body 제작
  getPayReserveParameters() {
    return {};
  }
}
