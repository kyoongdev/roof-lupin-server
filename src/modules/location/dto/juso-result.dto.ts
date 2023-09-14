import { Property } from 'cumuco-nestjs';

import { AddressResult } from '@/interface/location.interface';

import { JusoCommonDTO } from './juso-common.dto';
import { JusoDTO } from './juso.dto';

export class JusoResultDTO {
  @Property({ apiProperty: { type: JusoCommonDTO } })
  common: JusoCommonDTO;

  @Property({ apiProperty: { type: JusoDTO, isArray: true } })
  juso: JusoDTO[];

  constructor(props: AddressResult) {
    this.common = new JusoCommonDTO(props.common);
    this.juso = props.juso.map((juso) => new JusoDTO(juso));
  }
}
