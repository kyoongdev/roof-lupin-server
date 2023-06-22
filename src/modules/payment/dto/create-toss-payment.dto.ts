import { Property } from 'wemacu-nestjs';

export interface CreateTossPaymentDTOProps {
  url: string;
}

export class CreateTossPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '토스 결제 URL' } })
  url: string;

  constructor(props: CreateTossPaymentDTOProps) {
    this.url = props.url;
  }
}
