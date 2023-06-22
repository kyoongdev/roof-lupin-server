import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class PortOneProvider {
  private apiClient = axios.create({
    baseURL: 'https://api.iamport.kr/payments',
  });
}
