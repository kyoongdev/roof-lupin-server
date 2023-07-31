import {
  Delete,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { UploadedFileDTO } from './dto';
import { FileService } from './file.service';

@ApiController('file', '파일')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Delete('/all')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '모든 파일 삭제',
      summary: '모든 S3 파일 삭제 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteAll() {
    await this.fileService.deleteAll();
  }

  // @Auth([JwtAuthGuard])
  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
    summary: {
      description: '이미지 업로드',
      summary: '이미지 업로드',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ResponseApi(
    {
      type: UploadedFileDTO,
    },
    201
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png|heic)$/ })],
      })
    )
    file: Express.Multer.File
  ) {
    return this.fileService.uploadFile(file);
  }

  // @Auth([JwtAuthGuard])
  @Post('/images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', undefined, { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
    summary: {
      description: '이미지 업로드',
      summary: '이미지 업로드',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    },
  })
  @ResponseApi(
    {
      type: UploadedFileDTO,
      isArray: true,
    },
    201
  )
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png|heic)$/ })],
      })
    )
    files: Express.Multer.File[]
  ) {
    const images = await Promise.all(files.map(async (file) => await this.fileService.uploadFile(file)));

    return images;
  }
}
