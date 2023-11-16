import { Body, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { DeleteFileDTO, UploadedFileDTO } from '@/modules/file/dto';
import { FileService } from '@/modules/file/file.service';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('file', '[관리자] 파일')
export class AdminFileController {
  constructor(private readonly fileService: FileService) {}

  @Delete('/all')
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

  @Get()
  @RequestApi({
    summary: {
      description: '모든 파일 불러오기',
      summary: '모든 S3 파일 불러오기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: UploadedFileDTO,
  })
  async getAll() {
    return await this.fileService.getAllFiles();
  }

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

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
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
          file: {
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
  async uploadFile(
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
    file: Express.Multer.File
  ) {
    return this.fileService.uploadResizedFile(file);
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
    files: Express.Multer.File[]
  ) {
    const images = await Promise.all(files.map(async (file) => await this.fileService.uploadResizedFile(file)));

    return images;
  }

  @Post('delete')
  @RequestApi({
    summary: {
      description: '이미지 삭제',
      summary: '이미지 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteImage(@Body() body: DeleteFileDTO) {
    await this.fileService.deleteFile(body.url);
  }
}
