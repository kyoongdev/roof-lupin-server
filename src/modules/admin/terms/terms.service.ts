import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GUEST_TERMS, HOST_TERMS } from '@/common/constants/terms';
import { FileService } from '@/modules/file/file.service';
import { TermDTO } from '@/modules/terms/dto';
import { TERM_ERROR_CODE } from '@/modules/terms/exception/errorCode';
import { TermException } from '@/modules/terms/exception/term.exception';

import { UpdateTermDTO } from '../dto/terms';

@Injectable()
export class AdminTermsService {
  constructor(private readonly fileService: FileService, private readonly configService: ConfigService) {}

  async getTerms() {
    const keys = [...Object.values(GUEST_TERMS), ...Object.values(HOST_TERMS)];

    return await Promise.all(
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

  async updateTerm(name: string, data: UpdateTermDTO) {
    const term = await this.getTerm(name);

    if (term.content) {
      await this.fileService.deleteFile(`${this.configService.get('AWS_CLOUD_FRONT_URL')}/${name}`);
    }
    await this.fileService.uploadBuffer(Buffer.from(data.content, 'utf-8'), name, 'text/plain');
  }

  async deleteTerm(name: string) {
    const term = await this.getTerm(name);

    if (!term.content) {
      throw new TermException(TERM_ERROR_CODE.TERM_NOT_FOUND);
    }

    await this.fileService.deleteFile(`${this.configService.get('AWS_CLOUD_FRONT_URL')}/${name}`);
  }
}
