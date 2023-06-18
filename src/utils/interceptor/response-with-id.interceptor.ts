import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseWithIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => ({ id: data['id'] ?? data })));
  }
}
