import { Admin } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { DateDTO } from '@/common';

import { AdminDTO } from './admin.dto';

type Props = Partial<Admin>;

export class AdminDetailDTO extends AdminDTO {
  password: string;

  salt: string;

  constructor(props: Props) {
    super(props);
    this.password = props.password;
    this.salt = props.salt;
  }
}
