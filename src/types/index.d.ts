import { ReqUserType } from '@/interface/role.interface';

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      }
    }
    interface Request {
      session: any;

      accessToken?: string;
      user?: ReqUserType;
      skip?: number;
      take?: number;
      file?: Multer.File | undefined;
      files?:
        | {
            [fieldname: string]: Multer.File[];
          }
        | Multer.File[]
        | undefined;
    }
  }
}
