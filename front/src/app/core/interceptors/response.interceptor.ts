import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const message = inject(NzMessageService);

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (
        event instanceof HttpResponse &&
        event.status !== 200 &&
        event.body?.message
      ) {
        message.success(event.body.message);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const msg = error.error?.message || 'Ocurrió un error inesperado';
      message.error(msg);
      return throwError(() => error);
    })
  );
};
