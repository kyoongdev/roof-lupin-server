import { Property } from 'cumuco-nestjs';

export class CertificatePhoneDTO {
  @Property({ apiProperty: { type: 'string', description: '본인 인증 결과 imp uid' } })
  imp_uid: string;
}
