import { Property } from 'wemacu-nestjs';

export interface KakaoPreparePaymentDTOProps {
  next_redirect_app_url: string;
  next_redirect_mobile_url: string;
  next_redirect_pc_url: string;
  android_app_scheme: string;
  ios_app_scheme: string;
  orderId: string;
}

export class KakaoPreparePaymentDTO {
  @Property({
    apiProperty: { type: 'string', description: '요청한 클라이언트가 모바일 앱일 경우 카카오톡 결제 페이지' },
  })
  nextRedirectAppUrl: string;

  @Property({
    apiProperty: { type: 'string', description: '요청한 클라이언트가 모바일 웹일 경우 카카오톡 결제 페이지' },
  })
  nextRedirectMobileUrl: string;

  @Property({
    apiProperty: { type: 'string', description: '요청한 클라이언트가 PC 웹일 경우 카카오톡 결제 페이지' },
  })
  nextRedirectPcUrl: string;

  @Property({
    apiProperty: { type: 'string', description: '카카오페이 결제 화면으로 이동하는 Android 앱 스킴(Scheme)' },
  })
  androidAppScheme: string;

  @Property({ apiProperty: { type: 'string', description: '카카오페이 결제 화면으로 이동하는 iOS 앱 스킴' } })
  iosAppScheme: string;

  @Property({ apiProperty: { type: 'string', description: '주문 ID' } })
  orderId: string;

  constructor(props: KakaoPreparePaymentDTOProps) {
    this.nextRedirectAppUrl = props.next_redirect_app_url;
    this.nextRedirectMobileUrl = props.next_redirect_mobile_url;
    this.nextRedirectPcUrl = props.next_redirect_pc_url;
    this.androidAppScheme = props.android_app_scheme;
    this.iosAppScheme = props.ios_app_scheme;
    this.orderId = props.orderId;
  }
}
