import { Injectable } from '@nestjs/common';

import { GUEST_TERMS, HOST_TERMS } from '@/common/constants/terms';

import { FileService } from '../file/file.service';

import { TermDTO } from './dto';

@Injectable()
export class TermsService {
  constructor(private readonly fileService: FileService) {}

  async getTerms() {
    const keys = [...Object.values(GUEST_TERMS), ...Object.values(HOST_TERMS)];

    await Promise.all(
      keys.map(async (key) => {
        const s3Body = await this.fileService.getFile(key);
        const content = s3Body ? await s3Body.transformToString() : null;
        return new TermDTO({
          id: key,
          name: key,
          content,
        });
      })
    );
  }

  async getTerm(key: string) {
    const s3Body = await this.fileService.getFile(key);
    const content = s3Body ? await s3Body.transformToString() : null;
    return new TermDTO({
      id: key,
      name: key,
      content,
    });
  }
}
