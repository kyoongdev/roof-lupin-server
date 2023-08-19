import { Body, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { ResizeFileDTO, S3ImageDTO, UploadedFileDTO } from './dto';
import { FileService } from './file.service';

@ApiController('file', '파일')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '모든 파일 불러오기',
      summary: '모든 S3 파일 불러오기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: S3ImageDTO,
    isArray: true,
  })
  async getAll() {
    return await this.fileService.getAllFiles();
  }

  // @Auth([JwtAuthGuard])
  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
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
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return this.fileService.uploadFile(file);
  }

  @Post('/image/resize')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
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
          width: {
            type: 'number',
            nullable: true,
          },
          height: {
            type: 'number',
            nullable: true,
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
  async uploadResizedImage(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: ResizeFileDTO
  ) {
    return this.fileService.uploadResizedFile(file, undefined, body.width, body.height);
  }

  // @Auth([JwtAuthGuard])
  @Post('/images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', undefined, {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
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
    @UploadedFiles()
    files: Express.Multer.File[]
  ) {
    const images = await Promise.all(files.map(async (file) => await this.fileService.uploadFile(file)));

    return images;
  }

  @Post('/images/resize')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', undefined, {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
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
          width: {
            type: 'number',
            nullable: true,
          },
          height: {
            type: 'number',
            nullable: true,
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
  async uploadResizedImages(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body() body: ResizeFileDTO
  ) {
    const images = await Promise.all(
      files.map(async (file) => await this.fileService.uploadResizedFile(file, undefined, body.width, body.height))
    );

    return images;
  }
}
