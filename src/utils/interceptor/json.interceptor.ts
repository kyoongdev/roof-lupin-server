import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class JsonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    this.parseJson(context.switchToHttp().getRequest().body);

    return next.handle();
  }

  parseJson(body: object) {
    Object.entries(body).forEach(([key, value]) => {
      console.log(key, value, typeof value);
      if (!value || (typeof value === 'string' && value.length === 0)) {
        body[key] = undefined;
      } else if (typeof value === 'object') {
        this.parseJson(value);
      }
    });
  }
}
