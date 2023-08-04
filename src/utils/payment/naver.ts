import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import { PayReserveParameters } from '@/interface/payment/naver.interface';
import { CreatePaymentDTO } from '@/modules/reservation/dto';
import { SpaceDetailDTO } from '@/modules/space/dto';
import { RentalTypeDTO } from '@/modules/space/dto/rental-type';
import { CommonUserDTO } from '@/modules/user/dto';

@Injectable()
export class NaverProvider {
  private apiClient = axios.create({
    baseURL: 'https://dev.apis.naver.com',
  });

  constructor(private readonly configService: ConfigService) {}

  //TODO: 네이버페이 결제 요청 body 제작
  getPayReserveParameters(
    data: CreatePaymentDTO,
    rentalTypes: RentalTypeDTO[],
    user: CommonUserDTO,
    orderId: string
  ): PayReserveParameters {
    return {
      merchantPayKey: orderId,
      merchantUserKey: this.configService.get('NAVERPAY_MERCHANT_USER_KEY'),
      productName: rentalTypes.reduce<string>((acc, next) => {
        acc += next.name + ' | ';
        return acc;
      }, ''),
      productCount: data.rentalTypes.length,
      totalPayAmount: data.totalCost,
      taxScopeAmount: data.totalCost,
      taxExScopeAmount: 0,
      returnUrl: this.configService.get('NAVERPAY_RETURN_URL'),
      purchaserName: data.userName,
      purchaserBirthDay: user.birthYear + user.birthDay,
      productItems: rentalTypes.map((rentalType) => ({
        categoryId: 'GENERAL',
        categoryType: 'PRODUCT',
        uid: rentalType.id,
        name: rentalType.name,
        count: 1,
        endDate: null,
        payReferrer: null,
        sellerId: null,
        startDate: null,
      })),
    };
  }

  async approvePayment(paymentId: string) {
    try {
      //
    } catch (err) {
      console.log(err);
    }
  }
}
